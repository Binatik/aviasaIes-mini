import { Filter } from "./Filter/Filter";
import { Sort } from "./Sort/Sort";
import classes from "./Aviasales.module.scss";
import { useEffect } from "react";
import { Api } from "../../api/api";
import Cookie from "js-cookie";
import { CookieKey } from "./store/enums";
import { useAviasalesDispatch } from "./store/hooks/useAviasalesDispatch";
import { fetchNewTickets } from "./store/redux/slices/ticketsSlice";

const api = new Api();

function Aviasales() {
  const dispatch = useAviasalesDispatch();

  useEffect(() => {
    async function getNewTickets() {
      const sessionKey = Cookie.get(CookieKey.session);

      if (sessionKey) {
        dispatch(fetchNewTickets());
        return;
      }

      const newSession = await api.createSession();
      Cookie.set("session", newSession.searchId, {
        expires: 1,
      });

      dispatch(fetchNewTickets());
    }
    getNewTickets();
  }, [dispatch]);

  return (
    <div className={classes.aviasalesContainer}>
      <Filter />
      <Sort />
    </div>
  );
}

export { Aviasales };
