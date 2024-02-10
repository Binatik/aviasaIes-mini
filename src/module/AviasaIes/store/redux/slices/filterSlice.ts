import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CheckboxKey } from "../../enums";

type ICheckboxState = Record<CheckboxKey, boolean> & {
  disabledAllCheckbox: boolean;
};

const initialState: ICheckboxState = {
  disabledAllCheckbox: false,
  [CheckboxKey.allCheckbox]: true,
  [CheckboxKey.noneCheckbox]: false,
  [CheckboxKey.firstCheckbox]: false,
  [CheckboxKey.secondCheckbox]: false,
  [CheckboxKey.thirdCheckbox]: false,
};

const filterSlice = createSlice({
  name: "filterSlice",
  initialState,
  reducers: {
    setCheckBox(
      state,
      action: PayloadAction<{ key: string; isActive: boolean }>,
    ) {
      const { key, isActive } = action.payload;

      state[key as CheckboxKey] = isActive;
      state.disabledAllCheckbox =
        state.noneCheckbox ||
        state.firstCheckbox ||
        state.secondCheckbox ||
        state.thirdCheckbox;
    },

    resetCheckBox(state) {
      state.disabledAllCheckbox = false;
      (state.noneCheckbox = false),
        (state.firstCheckbox = false),
        (state.secondCheckbox = false),
        (state.thirdCheckbox = false);
    },
  },
});

const filterActions = filterSlice.actions;
const filterReducer = filterSlice.reducer;

export { filterActions, filterReducer };
