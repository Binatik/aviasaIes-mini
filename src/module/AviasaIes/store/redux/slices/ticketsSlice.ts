import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Api } from "../../../../../api/api";
import { CheckboxKey, CookieKey } from "../../enums";
import Cookie from "js-cookie";
import { ITicket } from "../../../../../api/api.types";
import { RootState } from "../store";

type ITicketsType = ITicket[];
type ISortedType = "fast" | "cheap" | "optimal";

type ITicketsState = {
  tickets: ITicketsType;
  ticketsFilter: ITicketsType;
  loadedTickets: ITicketsType;
  sortedType: ISortedType | null;
  position: number;
  status: "pending" | "fulfilled" | "rejected" | null;
  fakeStatus: "pending" | "fulfilled" | "rejected" | null;
  error: boolean | null;
  checkBoxType: Record<CheckboxKey, boolean>;
};

const api = new Api();

const initialState: ITicketsState = {
  tickets: [],
  ticketsFilter: [],
  loadedTickets: [],
  position: 5,
  sortedType: null,
  status: null,
  fakeStatus: null,
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
    addPosition: (state) => {
      state.position += 5;
    },

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

    setSortedType: (state, action: PayloadAction<ISortedType>) => {
      state.sortedType = action.payload;
    },

    executeFilter: (state: ITicketsState) => {
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
            //Вычитаем из index кол-во ключей которые хотим пропустить от 0.
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

    executeSort: (state) => {
      const { sortedType } = state;

      if (!sortedType) {
        return;
      }

      if (sortedType === "cheap") {
        state.ticketsFilter = state.ticketsFilter.sort((a, b) => a.price - b.price);
      }

      if (sortedType === "fast") {
        state.ticketsFilter = state.ticketsFilter.sort((current, next) => {
          //Получаем сумму duration в обоих направлениях для current и next билетов.
          const durationCurrent = current.segments[0].duration + current.segments[1].duration;
          const durationNext = next.segments[0].duration + next.segments[1].duration;

          return durationCurrent - durationNext;
        });
      }
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchNewTickets.pending, (state) => {
      console.log("pending");
      state.status = "pending";
      state.error = null;
    });
    builder.addCase(fetchNewTickets.fulfilled, (state, action) => {
      console.log("fulfilled");
      state.status = "fulfilled";
      state.tickets = action.payload;
      state.ticketsFilter = action.payload;
      state.loadedTickets = action.payload.slice(0, state.position);
    });
    builder.addCase(fetchNewTickets.rejected, (state) => {
      state.status = "rejected";
      state.error = true;
    });

    builder.addCase(loadingTickets.pending, (state) => {
      state.fakeStatus = "pending";
      state.error = null;
    });
    builder.addCase(loadingTickets.fulfilled, (state, action) => {
      state.loadedTickets = action.payload;
      state.fakeStatus = "fulfilled";
    });
  },
});

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

export const loadingTickets = createAsyncThunk("ticketsSlice/loadingTickets", async (_, { getState }) => {
  const state = getState() as RootState;
  const ticketsFilter = state.ticketsReducer.ticketsFilter;
  const position = state.ticketsReducer.position;
  const tmp = await api.fakeEndpoint<ITicket[]>(300, ticketsFilter);

  return tmp.slice(0, position);
});

const ticketsActions = ticketsSlice.actions;
const ticketsReducer = ticketsSlice.reducer;

export { ticketsActions, ticketsReducer };
