import { ISegment } from "../../../api/api.types";
import { formatAmount } from "../../../helpers/formatAmount";
import { formatTimer } from "../../../helpers/formatTimer";
import { getDifferenceTime } from "../../../helpers/getDifferenceTime";
import { Button } from "../../../ui/Button/Button";
import { Card } from "../../../ui/Card/Card";
import { Paragraph } from "../../../ui/Paragraph/Paragraph";
import { getEndingTransfer } from "../helpers/getEnding";
import { useAviasalesSelector } from "../store/hooks/useAviasalesSelector";
import classes from "./Sort.module.scss";

function Sort() {
  const tickets = useAviasalesSelector((state) => state.ticketsReducer.ticketsFilter);
  const loader = useAviasalesSelector((state) => state.ticketsReducer.status);
  const error = useAviasalesSelector((state) => state.ticketsReducer.error);

  console.log(tickets);

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

    if (loader === "pending" && !error) {
      return <span style={{ marginBlock: "50px" }}> Идет загрузка...</span>;
    }

    return tickets?.map((ticket) => (
      <Card key={ticket.price + ticket.carrier} mode="primary" size="medium">
        <div className={classes.tickets}>
          <Paragraph className={classes.ticketsPrice} size="medium" mode="success">
            {formatAmount(ticket.price)} P
          </Paragraph>
          <Paragraph className={classes.ticketsPrice} size="medium" mode="success">
            13 400 Р
          </Paragraph>
        </div>
        <div className={classes.segments}>{ticket.segments.map((segment) => renderSegment(segment))}</div>
      </Card>
    ));
  }

  return (
    <div className={classes.aviasalesSort}>
      <div className={classes.aviasalesSortContainer}>
        <Button mode="primary" wide type="active" disabled>
          <Paragraph mode="primary">Самый дешевый</Paragraph>
        </Button>
        <Button mode="primary" wide>
          <Paragraph mode="primary">Самый быстрый</Paragraph>
        </Button>
        <Button mode="primary" wide>
          <Paragraph mode="primary">Оптимальный</Paragraph>
        </Button>
      </div>
      <div className={classes.aviasalesContent}>
        {renderTickets()}
        <br />

        {loader === "fulfilled" && !error && (
          <Button className={classes.aviasalesLoadTicket} mode="primary" wide>
            <Paragraph mode="primary">Показать еще 5 билетов!</Paragraph>
          </Button>
        )}
      </div>
    </div>
  );
}

export { Sort };
