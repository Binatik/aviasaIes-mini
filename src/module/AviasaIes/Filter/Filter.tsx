import { Card } from "../../../ui/Card/Card";
import { Checkbox } from "../../../ui/Checkbox/Checkbox";
import { Paragraph } from "../../../ui/Paragraph/Paragraph";
import { useAviasalesSelector } from "../store/hooks/useAviasalesSelector";
import { CheckboxKey } from "../store/enums";
import { useAviasalesDispatch } from "../store/hooks/useAviasalesDispatch";
import classes from "./Filter.module.scss";
import { ticketsActions } from "../store/redux/slices/ticketsSlice";

function Filter() {
  const dispatch = useAviasalesDispatch();
  
  const checkBox = useAviasalesSelector((state) => state.ticketsReducer.checkBoxType);

  const { disabledAllCheckbox, noneCheckbox, firstCheckbox, secondCheckbox, thirdCheckbox } = checkBox;

  function updateCheckBox(event: React.ChangeEvent<HTMLInputElement>) {
    const data = {
      key: event.currentTarget.value as CheckboxKey,
      isActive: event.currentTarget.checked,
    };

    dispatch(ticketsActions.setCheckBox(data));
    dispatch(ticketsActions.executeTicketsFilter());
  }

  return (
    <Card mode="primary" size="none" className={classes.aviasalesFilter}>
      <Paragraph mode="primary">Количество пересадок</Paragraph>
      <Checkbox
        onChange={updateCheckBox}
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
