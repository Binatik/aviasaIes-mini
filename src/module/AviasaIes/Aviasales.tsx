import { AviasalesFilter } from "./AviasalesFilter/AviasalesFilter";
import { AviasalesSort } from "./AviasalesSort/AviasalesSort";
import { Provider } from "react-redux";
import { store } from "./store/redux/store";
import classes from "./Aviasales.module.scss";

function Aviasales() {
  return (
    <Provider store={store}>
      <div className={classes.aviasalesContainer}>
        <AviasalesFilter />
        <AviasalesSort />
      </div>
    </Provider>
  );
}

export { Aviasales };
