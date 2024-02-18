import { Filter } from "./Filter/Filter";
import { Sort } from "./Sort/Sort";
import classes from "./Aviasales.module.scss";
import { useEffect } from "react";
import { Api } from "../../api/api";
import Cookie from "js-cookie";
import { CookieKey } from "./store/enums";
import { useAviasalesDispatch } from "./store/hooks/useAviasalesDispatch";
import { fetchNewTickets, ticketsActions } from "./store/redux/slices/ticketsSlice";
import { useAviasalesSelector } from "./store/hooks/useAviasalesSelector";

const api = new Api();

function Aviasales() {
  const dispatch = useAviasalesDispatch();
  const ticketsData = useAviasalesSelector((state) => state.ticketsReducer.tickets);
  const loader = useAviasalesSelector((state) => state.ticketsReducer.status);
  const ticketsStop = useAviasalesSelector((state) => state.ticketsReducer.stop);

  useEffect(() => {
    dispatch(fetchNewTickets());
  }, [dispatch]);

  useEffect(() => {
    async function test() {
      if ((!ticketsStop && loader === "fulfilled") || (!ticketsStop && loader === "rejected")) {
        await dispatch(fetchNewTickets());
        dispatch(ticketsActions.executeFilter())
        dispatch(ticketsActions.executeSort())
      }
    }
    test()

    async function getSession() {
      const sessionKey = Cookie.get(CookieKey.session);

      if (!sessionKey) {
        const newSession = await api.createSession();
        Cookie.set("session", newSession.searchId);
      }

      if (ticketsStop) {
        Cookie.remove("session");
      }
    }
    getSession();
  }, [dispatch, ticketsData, loader, ticketsStop]);

  return (
    <div className={classes.aviasalesContainer}>
      <Filter />
      <Sort />
    </div>
  );
}

export { Aviasales };
