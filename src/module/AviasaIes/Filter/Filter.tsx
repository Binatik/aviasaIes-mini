import { Card } from "../../../ui/Card/Card";
import { Checkbox } from "../../../ui/Checkbox/Checkbox";
import { Paragraph } from "../../../ui/Paragraph/Paragraph";
import { useAviasalesSelector } from "../store/hooks/useAviasalesSelector";
import { CheckboxKey } from "../store/enums";
import { useAviasalesDispatch } from "../store/hooks/useAviasalesDispatch";
import { filterActions } from "../store/redux/slices/filterSlice";
import classes from "./Filter.module.scss";

function Filter() {
  const state = {
    disabledAllCheckbox: useAviasalesSelector(
      (state) => state.filterReducer.disabledAllCheckbox,
    ),
    [CheckboxKey.allCheckbox]: useAviasalesSelector(
      (state) => state.filterReducer.allCheckbox,
    ),
    [CheckboxKey.noneCheckbox]: useAviasalesSelector(
      (state) => state.filterReducer.noneCheckbox,
    ),
    [CheckboxKey.firstCheckbox]: useAviasalesSelector(
      (state) => state.filterReducer.firstCheckbox,
    ),
    [CheckboxKey.secondCheckbox]: useAviasalesSelector(
      (state) => state.filterReducer.secondCheckbox,
    ),
    [CheckboxKey.thirdCheckbox]: useAviasalesSelector(
      (state) => state.filterReducer.thirdCheckbox,
    ),
  };
  const {
    disabledAllCheckbox,
    noneCheckbox,
    firstCheckbox,
    secondCheckbox,
    thirdCheckbox,
  } = state;

  const dispatch = useAviasalesDispatch();

  console.log(
    disabledAllCheckbox,
    noneCheckbox,
    firstCheckbox,
    secondCheckbox,
    thirdCheckbox,
  );

  function updateCheckBox(event: React.ChangeEvent<HTMLInputElement>) {
    const data = {
      key: event.currentTarget.value,
      isActive: event.currentTarget.checked,
    };

    dispatch(filterActions.setCheckBox(data));
  }

  return (
    <Card mode="primary" size="none" className={classes.aviasalesFilter}>
      <Paragraph mode="primary">Количество пересадок</Paragraph>
      <Checkbox
        onChange={() => dispatch(filterActions.resetCheckBox())}
        checked={!disabledAllCheckbox}
        value={CheckboxKey.allCheckbox}
        htmlForId="all"
        label="Все"
      />
      <Checkbox
        checked={noneCheckbox}
        onChange={updateCheckBox}
        value={CheckboxKey.noneCheckbox}
        htmlForId="off"
        label="Без пересадок"
      />
      <Checkbox
        checked={firstCheckbox}
        onChange={updateCheckBox}
        value={CheckboxKey.firstCheckbox}
        htmlForId="1"
        label="1 пересадка"
      />
      <Checkbox
        checked={secondCheckbox}
        onChange={updateCheckBox}
        value={CheckboxKey.secondCheckbox}
        htmlForId="2"
        label="2 пересадки"
      />
      <Checkbox
        onChange={updateCheckBox}
        value={CheckboxKey.thirdCheckbox}
        checked={thirdCheckbox}
        htmlForId="3"
        label="3 пересадки"
      />
    </Card>
  );
}

export { Filter };
