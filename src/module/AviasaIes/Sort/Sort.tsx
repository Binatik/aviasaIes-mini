import { useEffect } from "react";
import { ISegment } from "../../../api/api.types";
import { formatAmount } from "../../../helpers/formatAmount";
import { formatTimer } from "../../../helpers/formatTimer";
import { getDifferenceTime } from "../../../helpers/getDifferenceTime";
import { Button } from "../../../ui/Button/Button";
import { Card } from "../../../ui/Card/Card";
import { Paragraph } from "../../../ui/Paragraph/Paragraph";
import { getEndingTransfer } from "../helpers/getEnding";
import { useAviasalesDispatch } from "../store/hooks/useAviasalesDispatch";
import { useAviasalesSelector } from "../store/hooks/useAviasalesSelector";
import { loadingTickets, ticketsActions } from "../store/redux/slices/ticketsSlice";
import classes from "./Sort.module.scss";
import { Spinner } from "../../../ui/Spinner/Spinner";

function Sort() {
  const dispatch = useAviasalesDispatch();

  const ticketsFilter = useAviasalesSelector((state) => state.ticketsReducer.ticketsFilter);
  const tickets = useAviasalesSelector((state) => state.ticketsReducer.loadedTickets);

  const loader = useAviasalesSelector((state) => state.ticketsReducer.status);
  const pollingLoader = useAviasalesSelector((state) => state.ticketsReducer.pollingStatus);
  const error = useAviasalesSelector((state) => state.ticketsReducer.error);

  const sortedType = useAviasalesSelector((state) => state.ticketsReducer.sortedType);
  const position = useAviasalesSelector((state) => state.ticketsReducer.position);
  const checkBoxType = useAviasalesSelector((state) => state.ticketsReducer.checkBoxType);

  useEffect(() => {
    dispatch(ticketsActions.executeSort());
    dispatch(loadingTickets());
  }, [dispatch, sortedType, checkBoxType]);

  function renderSegment(segment: ISegment) {
    const timer = formatTimer(segment.duration);
    const travelTime = `${timer.hoursString}ч ${timer.minutesString}м`;

    return (
      <div key={segment.date} className={classes.segment}>
        <div className={classes.segmentType}>
          <Paragraph mode="secondary">
            {segment.origin} - {segment.destination}
          </Paragraph>
          <Paragraph mode="primary" className={classes.segmentTypeParagraph}>
            {getDifferenceTime(segment.date, segment.duration, "-")}
          </Paragraph>
        </div>
        <div className={classes.segmentType}>
          <Paragraph mode="secondary">В пути</Paragraph>
          <Paragraph mode="primary" className={classes.segmentTypeParagraph}>
            {travelTime}
          </Paragraph>
        </div>
        <div className={classes.segmentType}>
          <Paragraph mode="secondary">
            {segment.stops.length + " "}
            {getEndingTransfer(segment.stops.length)}
          </Paragraph>
          <div className={classes.stops}>
            {segment.stops.map((stop, index) => (
              <Paragraph key={index} mode="primary" className={classes.stopParagraph}>
                {stop}
              </Paragraph>
            ))}
          </div>
        </div>
      </div>
    );
  }

  function renderTickets() {
    if (error) {
      return <span style={{ marginBlock: "50px" }}> Возникла ошибка</span>;
    }

    if (pollingLoader === "pending" && !error) {
      return (
        <div className={classes.loader}>
          <Spinner />
        </div>
      );
    }

    if (tickets.length === 0 && loader === "fulfilled") {
      return <span style={{ marginBlock: "50px" }}> Кажется мы ничего не нашли</span>;
    }

    return tickets.map((ticket, index) => (
      <Card key={ticket.price + ticket.carrier + index} mode="primary" size="medium">
        <div className={classes.tickets}>
          <Paragraph className={classes.ticketsPrice} size="medium" mode="success">
            {formatAmount(ticket.price)} P
          </Paragraph>
          <img src={`//pics.avs.io/99/36/${ticket.carrier}.png`} alt={`CompanyLogo ${ticket.carrier}`} />
        </div>
        <div className={classes.segments}>{ticket.segments.map((segment) => renderSegment(segment))}</div>
      </Card>
    ));
  }

  return (
    <div className={classes.aviasalesSort}>
      <div className={classes.aviasalesSortContainer}>
        <Button
          onClick={() => dispatch(ticketsActions.setSortedType("cheap"))}
          mode="primary"
          wide
          type={sortedType === "cheap" ? "active" : "disabled"}
          disabled={sortedType === "cheap"}
        >
          <Paragraph mode="primary">Самый дешевый</Paragraph>
        </Button>
        <Button
          onClick={() => dispatch(ticketsActions.setSortedType("fast"))}
          mode="primary"
          wide
          type={sortedType === "fast" ? "active" : "disabled"}
          disabled={sortedType === "fast"}
        >
          <Paragraph mode="primary">Самый быстрый</Paragraph>
        </Button>
        <Button
          onClick={() => dispatch(ticketsActions.setSortedType("optimal"))}
          mode="primary"
          wide
          type={sortedType === "optimal" ? "active" : "disabled"}
          disabled={sortedType === "optimal"}
        >
          <Paragraph mode="primary">Оптимальный</Paragraph>
        </Button>
      </div>
      <div className={classes.aviasalesContent}>
        {renderTickets()}
        {!error && (
          <Button
            disabled={position >= ticketsFilter.length}
            onClick={async () => {
              dispatch(ticketsActions.addPosition());
              dispatch(loadingTickets());
            }}
            className={classes.aviasalesLoadTicket}
            mode="primary"
            wide
          >
            <Paragraph mode="primary">Показать еще 5 билетов!</Paragraph>
          </Button>
        )}
      </div>
    </div>
  );
}

export { Sort };
