import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Api } from "../../../../../api/api";
import { CheckboxKey, CookieKey } from "../../enums";
import Cookie from "js-cookie";
import { ITicket } from "../../../../../api/api.types";

type ITicketsType = ITicket[] | null;

type ITicketsState = {
  tickets: ITicketsType;
  ticketsFilter: ITicketsType;
  status: "pending" | "fulfilled" | "rejected" | null;
  error: boolean | null;

  checkBoxType: Record<CheckboxKey, boolean>;
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
    [CheckboxKey.disabledAllCheckbox]: false,
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

    executeTicketsFilter: (state: ITicketsState) => {
      type keyType = keyof typeof CheckboxKey;

      const { checkBoxType } = state;
      const results: ITicket[] = [];

      if (!checkBoxType.disabledAllCheckbox) {
        state.ticketsFilter = state.tickets;
        return;
      }

      Object.keys(checkBoxType).forEach((key, index) => {
        if (checkBoxType[key as keyType]) {
          if (key !== CheckboxKey.allCheckbox && key !== CheckboxKey.disabledAllCheckbox) {
            const ticketsFilter = state.tickets?.filter(({ segments }) =>
              segments.every((segment) => segment.stops.length === index - 2),
            );

            if (ticketsFilter) {
              results.push(...ticketsFilter);
            }
          }
        }
      });

      state.ticketsFilter = results.flat();
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
