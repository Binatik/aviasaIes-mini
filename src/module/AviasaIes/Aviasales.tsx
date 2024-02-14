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
    const session = Cookie.get(CookieKey.session);

    if (session) {
      return;
    }

    api
      .createSession()
      .then((session) => {
        Cookie.set("session", session.searchId, { expires: 15 });
      })
      .then(() => {
        dispatch(fetchNewTickets());
      });
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchNewTickets());
  }, [dispatch]);

  return (
    <div className={classes.aviasalesContainer}>
      <Filter />
      <Sort />
    </div>
  );
}

export { Aviasales };
