import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Api } from "../../../../../api/api";
import { CheckboxKey, CookieKey } from "../../enums";
import Cookie from "js-cookie";
import { ITicket } from "../../../../../api/api.types";

type ITicketsState = {
  tickets: ITicket[] | null;
  ticketsFilter: ITicket[] | null | undefined;
  status: "pending" | "fulfilled" | "rejected" | null;
  error: boolean | null;

  checkBoxType: Record<CheckboxKey, boolean> & {
    disabledAllCheckbox: boolean;
  };
};

const api = new Api();

export const fetchNewTickets = createAsyncThunk("ticketsSlice/fetchNewTickets", async () => {
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
});

const initialState: ITicketsState = {
  tickets: null,
  ticketsFilter: [],
  status: null,
  error: null,

  checkBoxType: {
    disabledAllCheckbox: false,
    [CheckboxKey.allCheckbox]: true,
    [CheckboxKey.noneCheckbox]: false,
    [CheckboxKey.firstCheckbox]: false,
    [CheckboxKey.secondCheckbox]: false,
    [CheckboxKey.thirdCheckbox]: false,
  },
};

const ticketsSlice = createSlice({
  name: "ticketsSlice",
  initialState,
  reducers: {
    setCheckBox: (state, action: PayloadAction<{ key: CheckboxKey; isActive: boolean }>) => {
      const { key, isActive } = action.payload;
      const { checkBoxType } = state;

      state.checkBoxType[key] = isActive;

      state.checkBoxType.disabledAllCheckbox =
        checkBoxType[CheckboxKey.noneCheckbox] ||
        checkBoxType[CheckboxKey.firstCheckbox] ||
        checkBoxType[CheckboxKey.secondCheckbox] ||
        checkBoxType[CheckboxKey.thirdCheckbox];

      if (key === CheckboxKey.allCheckbox && isActive) {
        for (const key in state.checkBoxType) {
          state.checkBoxType[key as CheckboxKey] = false;
        }
      }
    },

    executeTicketsFilter: (state) => {
      const { checkBoxType } = state;

      if (!checkBoxType.disabledAllCheckbox) {
        console.log("все");
        state.ticketsFilter = state.tickets;
        return;
      }

      if (checkBoxType[CheckboxKey.noneCheckbox]) {
        console.log("без");
        state.ticketsFilter = state.tickets?.filter(({ segments }) =>
          segments.every((segment) => segment.stops.length === 0),
        );
      }

      if (checkBoxType[CheckboxKey.firstCheckbox]) {
        console.log("1");
        state.ticketsFilter = state.tickets?.filter(({ segments }) =>
          segments.every((segment) => segment.stops.length === 1),
        );
      }

      if (checkBoxType[CheckboxKey.secondCheckbox]) {
        console.log("2");
        state.ticketsFilter = state.tickets?.filter(({ segments }) =>
          segments.every((segment) => segment.stops.length === 2),
        );
      }

      if (checkBoxType[CheckboxKey.thirdCheckbox]) {
        console.log("3");
        state.ticketsFilter = state.tickets?.filter(({ segments }) =>
          segments.every((segment) => segment.stops.length === 3),
        );
      }
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchNewTickets.pending, (state) => {
      state.status = "pending";
      state.error = null;
    });
    builder.addCase(fetchNewTickets.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.tickets = action.payload;
      state.ticketsFilter = action.payload;
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
