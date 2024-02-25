import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Api } from "../../../../../api/api";
import { CheckboxKey, CookieKey } from "../../enums";
import Cookie from "js-cookie";
import { ITicket } from "../../../../../api/api.types";
import { RootState } from "../store";
import { v4 as createId } from "uuid";

export type ISortedType = "fast" | "cheap" | "optimal";

type ITicketsState = {
  saveTickets: ITicket[];
  modifiedTickets: ITicket[];
  progressivelyLoadedTickets: ITicket[];
  isReceivedFetchData: boolean;
  sortedType: ISortedType | null;
  stop: boolean;
  position: number;
  fetchLoading: "pending" | "fulfilled" | null;
  fakeLoading: "pending" | "fulfilled" | null;
  error: boolean | null;
  checkBoxType: Record<CheckboxKey, boolean>;
};

const api = new Api();

const initialState: ITicketsState = {
  saveTickets: [],
  modifiedTickets: [],
  progressivelyLoadedTickets: [],
  fetchLoading: null,
  fakeLoading: null,
  sortedType: null,
  isReceivedFetchData: false,
  error: false,
  stop: false,
  position: 5,

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
      console.log('ddd')
      state.sortedType = action.payload;
    },

    setIdTickets: (state, action: PayloadAction<ITicket[]>) => {
      const dataTrueId = action.payload.map<ITicket>((ticket) => {
        return { ...ticket, id: createId() };
      });

      state.saveTickets = [...state.saveTickets, ...dataTrueId];
    },

    executeFilter: (state: ITicketsState) => {
      type keyType = keyof typeof CheckboxKey;

      const { checkBoxType } = state;
      let results: ITicket[] = [];

      if (!checkBoxType.disabledAllCheckbox) {
        state.modifiedTickets = state.saveTickets;
        return;
      }

      Object.keys(checkBoxType).forEach((key, index) => {
        if (checkBoxType[key as keyType]) {
          if (key !== CheckboxKey.allCheckbox && key !== CheckboxKey.disabledAllCheckbox) {
            //Вычитаем из index кол-во ключей которые хотим пропустить от 0.
            const ticketsFilter = state.saveTickets?.filter(({ segments }) =>
              segments.every((segment) => segment.stops.length === index - 2),
            );

            if (ticketsFilter) {
              results = [...results, ...ticketsFilter];
            }
          }
        }
      });

      state.position = 5;
      state.modifiedTickets = results.sort(() => Math.random() - 0.5);
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchNewTickets.pending, (state) => {
      state.fetchLoading = "pending";
      state.error = false;
    });
    builder.addCase(fetchNewTickets.fulfilled, (state, action) => {
      state.stop = action.payload.stop;
      state.isReceivedFetchData = true;
      state.fetchLoading = "fulfilled";
    });
    builder.addCase(fetchNewTickets.rejected, (state) => {
      state.error = true;
    });

    builder.addCase(loadingTickets.pending, (state) => {
      state.fakeLoading = "pending";
    });
    builder.addCase(loadingTickets.fulfilled, (state, action) => {
      state.fakeLoading = "fulfilled";

      if (action.payload.length > 1) {
        state.progressivelyLoadedTickets = action.payload;
        return;
      }

      state.progressivelyLoadedTickets = state.saveTickets.slice(0, state.position);
    });

    builder.addCase(fetchTicketsSort.pending, (state) => {
      state.fakeLoading = "pending";
    });

    builder.addCase(fetchTicketsSort.fulfilled, (state, action) => {
      state.modifiedTickets = action.payload;
      state.position = 5;
      state.fakeLoading = "fulfilled";
    });
  },
});

export const fetchNewTickets = createAsyncThunk("ticketsSlice/fetchNewTickets", async (_, { dispatch }) => {
  const session = Cookie.get(CookieKey.session);

  if (!session) {
    new Error("Not session");
  }

  const result = await api.get(`/tickets?searchId=${session}`, {
    headers: {
      "Content-type": "application/json",
    },
  });

  dispatch(ticketsActions.setIdTickets(result.tickets));

  return result;
});

export const loadingTickets = createAsyncThunk("ticketsSlice/loadingTickets", async (_, { getState }) => {
  const state = getState() as RootState;

  const position = state.ticketsReducer.position;
  const modifiedTickets = state.ticketsReducer.modifiedTickets;

  const result = await api.fakeEndpoint(5000, modifiedTickets);

  return result.slice(0, position);
});

export const fetchTicketsSort = createAsyncThunk("ticketsSlice/fetchTicketsSort", async (_, { getState }) => {
  const state = getState() as RootState;

  const sortedType = state.ticketsReducer.sortedType;
  const modifiedTickets = state.ticketsReducer.modifiedTickets;

  return await api.fakeExecuteSort(sortedType, modifiedTickets);
});

const ticketsActions = ticketsSlice.actions;
const ticketsReducer = ticketsSlice.reducer;

export { ticketsActions, ticketsReducer };
