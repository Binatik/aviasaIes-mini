import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Api, IAviasales } from "../../../../../api/api";
import { CookieKey } from "../../enums";
import Cookie from "js-cookie";

const api = new Api();

export const fetchNewTickets = createAsyncThunk(
  "ticketsSlice/fetchNewTickets",
  async () => {
    const session = Cookie.get(CookieKey.session);

    if (!session) {
      return [];
    }

    const { tickets } = await api.get(`/tickets?searchId=${session}`, {
      headers: {
        "Content-type": "application/json",
      },
    });

    return tickets;
  },
);

type ITicketsState = {
  tickets: IAviasales["tickets"] | null;
  status: "pending" | "fulfilled" | "rejected" | null;
  error: boolean | null;
};

const initialState: ITicketsState = {
  tickets: null,
  status: null,
  error: null,
};

const ticketsSlice = createSlice({
  name: "ticketsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNewTickets.pending, (state) => {
      state.status = "pending";
      state.error = null;
    });
    builder.addCase(fetchNewTickets.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.tickets = action.payload;
    });

    builder.addCase(fetchNewTickets.rejected, (state) => {
      state.status = "rejected";
      state.error = true;
    });
  },
});

const ticketsActions = ticketsSlice.actions;
const ticketsReducer = ticketsSlice.reducer;

export { ticketsActions, ticketsReducer };
