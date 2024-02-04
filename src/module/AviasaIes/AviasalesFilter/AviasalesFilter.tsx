import { Card } from "../../../ui/Card/Card";
import { Checkbox } from "../../../ui/Checkbox/Checkbox";
import { Paragraph } from "../../../ui/Paragraph/Paragraph";
import classes from "./AviasalesFilter.module.scss";

function AviasalesFilter() {
  return (
    <Card mode="primary" size="none" className={classes.aviasalesFilter}>
      <Paragraph mode="primary">Количество пересадок</Paragraph>
      <Checkbox htmlForId="all" label="Все" />
      <Checkbox htmlForId="off" label="Без пересадок" />
      <Checkbox htmlForId="1" label="1 пересадка" />
      <Checkbox htmlForId="2" label="2 пересадки" />
      <Checkbox htmlForId="3" label="3 пересадки" />
    </Card>
  );
}

export { AviasalesFilter };
