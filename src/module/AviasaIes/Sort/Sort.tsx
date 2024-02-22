import { useEffect } from "react";
import { Button } from "../../../ui/Button/Button";
import { Paragraph } from "../../../ui/Paragraph/Paragraph";
import { useAviasalesDispatch } from "../store/hooks/useAviasalesDispatch";
import { useAviasalesSelector } from "../store/hooks/useAviasalesSelector";
import { fetchTicketsSort, ticketsActions } from "../store/redux/slices/ticketsSlice";
import classes from "./Sort.module.scss";

function Sort() {
  const dispatch = useAviasalesDispatch();

  const fakeLoading = useAviasalesSelector((state) => state.ticketsReducer.fakeLoading);
  const sortedType = useAviasalesSelector((state) => state.ticketsReducer.sortedType);

  useEffect(() => {
    dispatch(ticketsActions.executeFilter());
    dispatch(fetchTicketsSort());
  }, [dispatch, sortedType]);

  return (
    <div className={classes.aviasalesSort}>
      <div className={classes.aviasalesSortContainer}>
        <Button
          onClick={() => dispatch(ticketsActions.setSortedType("cheap"))}
          mode="primary"
          wide
          type={sortedType === "cheap" ? "active" : "disabled"}
          disabled={sortedType === "cheap" || fakeLoading === "pending"}
        >
          <Paragraph mode="primary">Самый дешевый</Paragraph>
        </Button>
        <Button
          onClick={() => dispatch(ticketsActions.setSortedType("fast"))}
          mode="primary"
          wide
          type={sortedType === "fast" ? "active" : "disabled"}
          disabled={sortedType === "fast" || fakeLoading === "pending"}
        >
          <Paragraph mode="primary">Самый быстрый</Paragraph>
        </Button>
        <Button
          onClick={() => dispatch(ticketsActions.setSortedType("optimal"))}
          mode="primary"
          wide
          type={sortedType === "optimal" ? "active" : "disabled"}
          disabled={sortedType === "optimal" || fakeLoading === "pending"}
        >
          <Paragraph mode="primary">Оптимальный</Paragraph>
        </Button>
      </div>
      {/* <div className={classes.aviasalesContent}>
        {renderLoader()}
        {renderTickets()}
        {!error && progressivelyLoadedTickets.length >= 5 && (
          <Button
            onClick={async () => {
              dispatch(ticketsActions.addPosition());
              await dispatch(loadingTickets());
            }}
            disabled={fakeLoading === "pending"}
            type="active"
            className={classes.aviasalesLoadTicket}
            mode="primary"
            wide
          >
            <Paragraph mode="primary">Показать еще 5 билетов!</Paragraph>
          </Button>
        )}
      </div> */}
    </div>
  );
}

export { Sort };
