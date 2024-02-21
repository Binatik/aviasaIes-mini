import { Filter } from "./Filter/Filter";
import { Sort } from "./Sort/Sort";
import classes from "./Aviasales.module.scss";
import { useEffect } from "react";
import { Api } from "../../api/api";
import Cookie from "js-cookie";
import { CookieKey } from "./store/enums";
import { useAviasalesDispatch } from "./store/hooks/useAviasalesDispatch";
import { fetchNewTickets, loadingTickets } from "./store/redux/slices/ticketsSlice";
import { useAviasalesSelector } from "./store/hooks/useAviasalesSelector";
import { Paragraph } from "../../ui/Paragraph/Paragraph";
import { Spinner } from "../../ui/Spinner/Spinner";
import classNames from "classnames";

const api = new Api();

function Aviasales() {
  const dispatch = useAviasalesDispatch();

  const isReceivedFetchData = useAviasalesSelector((state) => state.ticketsReducer.isReceivedFetchData);
  const error = useAviasalesSelector((state) => state.ticketsReducer.error);
  const modified = useAviasalesSelector((state) => state.ticketsReducer.modifiedTickets);
  const fetchLoading = useAviasalesSelector((state) => state.ticketsReducer.fetchLoading);
  const ticketsStop = useAviasalesSelector((state) => state.ticketsReducer.stop);

  useEffect(() => {
    dispatch(fetchNewTickets());
  }, [dispatch]);

  useEffect(() => {
    async function setSession() {
      const sessionKey = Cookie.get(CookieKey.session);

      if ((!ticketsStop && fetchLoading === "fulfilled") || (!ticketsStop && error)) {
        dispatch(fetchNewTickets());
      }

      if (!sessionKey) {
        const newSession = await api.createSession();
        Cookie.set("session", newSession.searchId);
      }

      if (ticketsStop && sessionKey) {
        Cookie.remove("session");
      }
    }
    setSession();
  }, [dispatch, fetchLoading, ticketsStop, error]);

  useEffect(() => {
    if (isReceivedFetchData) {
      dispatch(loadingTickets());
    }
  }, [dispatch, modified, isReceivedFetchData]);

  return (
    <div className={classes.aviasalesContainer}>
      <div
        className={classNames(classes.infoContainer, {
          hidden: ticketsStop,
        })}
      >
        <Spinner className={classes.spinnercContainer} size="small" position="start" />
        <Paragraph size="superSmall" mode="secondary">
          Загружаем билеты, могут быть проблемы в функционале!
        </Paragraph>
      </div>
      <div className={classes.aviasalesContent}>
        <Filter />
        <Sort />
      </div>
    </div>
  );
}

export { Aviasales };
