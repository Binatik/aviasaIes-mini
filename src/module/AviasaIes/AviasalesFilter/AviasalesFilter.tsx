import { Card } from "../../../ui/Card/Card";
import { Checkbox } from "../../../ui/Checkbox/Checkbox";
import classes from "./AviasalesFilter.module.scss";

function AviasalesFilter() {
  return (
    <Card mode="primary" className={classes.aviasalesFilter}>
      Колличество пересадок
      <Checkbox />
    </Card>
  )
}

export { AviasalesFilter }