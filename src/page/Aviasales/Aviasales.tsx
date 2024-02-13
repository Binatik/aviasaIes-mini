import { Provider } from "react-redux";
import { Aviasales } from "../../module/AviasaIes/Aviasales";
import { storeAviasales } from "../../module/AviasaIes/store/redux/store";

function AviasalesPage() {
  return (
    <Provider store={storeAviasales}>
      <Aviasales />
    </Provider>
  );
}

export { AviasalesPage };
