import { AnimatePresence, motion } from "framer-motion";
import { ISegment } from "../../../api/api.types";
import { formatAmount } from "../../../helpers/formatAmount";
import { formatTimer } from "../../../helpers/formatTimer";
import { getDifferenceTime } from "../../../helpers/getDifferenceTime";
import { Button } from "../../../ui/Button/Button";
import { Card } from "../../../ui/Card/Card";
import { Paragraph } from "../../../ui/Paragraph/Paragraph";
import { Spinner } from "../../../ui/Spinner/Spinner";
import { getEndingTransfer } from "../helpers/getEnding";
import { useAviasalesDispatch } from "../store/hooks/useAviasalesDispatch";
import { useAviasalesSelector } from "../store/hooks/useAviasalesSelector";
import { loadingTickets, ticketsActions } from "../store/redux/slices/ticketsSlice";
import classes from "./Tickets.module.scss";

function Tickets() {
  const dispatch = useAviasalesDispatch();

  const progressivelyLoadedTickets = useAviasalesSelector((state) => state.ticketsReducer.progressivelyLoadedTickets);
  const isReceivedFetchData = useAviasalesSelector((state) => state.ticketsReducer.isReceivedFetchData);
  const error = useAviasalesSelector((state) => state.ticketsReducer.error);
  const fakeLoading = useAviasalesSelector((state) => state.ticketsReducer.fakeLoading);

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

  function renderLoader() {
    if (fakeLoading === "pending" || !isReceivedFetchData) {
      return (
        <div className={classes.fideLoader}>
          <Spinner className={classes.ticketsLoader} />
        </div>
      );
    }
  }

  function renderTickets() {
    if (error) {
      return <span style={{ marginBlock: "50px" }}> Возникла ошибка</span>;
    }

    if (progressivelyLoadedTickets.length === 0 && fakeLoading === "fulfilled") {
      return <span style={{ marginBlock: "50px" }}> Кажется мы ничего не нашли</span>;
    }

    return progressivelyLoadedTickets.map((ticket) => (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        key={ticket.id}
      >
        <Card mode="primary" size="medium">
          <div className={classes.tickets}>
            <Paragraph className={classes.ticketsPrice} size="medium" mode="success">
              {formatAmount(ticket.price)} P
            </Paragraph>
            <img src={`//pics.avs.io/99/36/${ticket.carrier}.png`} alt={`CompanyLogo ${ticket.carrier}`} />
          </div>
          <div className={classes.segments}>{ticket.segments.map((segment) => renderSegment(segment))}</div>
        </Card>
      </motion.div>
    ));
  }

  return (
    <AnimatePresence>
      <div className={classes.content}>
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
            className={classes.loadTickets}
            mode="primary"
            wide
          >
            <Paragraph mode="primary">Показать еще 5 билетов!</Paragraph>
          </Button>
        )}
      </div>
    </AnimatePresence>
  );
}

export { Tickets };
