import { AviasalesFilter } from "./AviasalesFilter/AviasalesFilter";
import { AviasalesSort } from "./AviasalesSort/AviasalesSort";
import classes from "./Aviasales.module.scss";

function Aviasales() {
  return (
    <div className={classes.aviasalesContainer}>
      <AviasalesFilter />
      <AviasalesSort />
    </div>
  );
}

export { Aviasales };
