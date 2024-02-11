import { Button } from "../../../ui/Button/Button";
import { Card } from "../../../ui/Card/Card";
import { Paragraph } from "../../../ui/Paragraph/Paragraph";
import classes from "./AviasalesSort.module.scss";

function AviasalesSort() {
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
        <Card mode="primary" size="medium">
          <div className={classes.aviasalesItem}>
            <Paragraph
              className={classes.aviasalesPrice}
              size="medium"
              mode="success"
            >
              13 400 Р
            </Paragraph>
            <Paragraph
              className={classes.aviasalesPrice}
              size="medium"
              mode="success"
            >
              13 400 Р
            </Paragraph>
          </div>
          <div className={classes.aviasalesTickets}>
            <div className={classes.aviasalesTicket}>
              <div className={classes.aviasalesTicketItem}>
                <Paragraph mode="secondary">MOW – HKT</Paragraph>
                <Paragraph mode="primary">10:45 – 08:00</Paragraph>
              </div>
              <div className={classes.aviasalesTicketItem}>
                <Paragraph mode="secondary">В пути</Paragraph>
                <Paragraph mode="primary">21ч 15м</Paragraph>
              </div>
              <div className={classes.aviasalesTicketItem}>
                <Paragraph mode="secondary">2 пересадки</Paragraph>
                <Paragraph mode="primary">HKG, JNB</Paragraph>
              </div>
            </div>
            <div className={classes.aviasalesTicket}>
              <div className={classes.aviasalesTicketItem}>
                <Paragraph mode="secondary">MOW – HKT</Paragraph>
                <Paragraph mode="primary">10:45 – 08:00</Paragraph>
              </div>
              <div className={classes.aviasalesTicketItem}>
                <Paragraph mode="secondary">В пути</Paragraph>
                <Paragraph mode="primary">21ч 15м</Paragraph>
              </div>
              <div className={classes.aviasalesTicketItem}>
                <Paragraph mode="secondary">1 пересадка</Paragraph>
                <Paragraph mode="primary">HKG, JNB</Paragraph>
              </div>
            </div>
          </div>
        </Card>
        <br />
        <Button className={classes.aviasalesLoadTicket} mode="primary" wide>
          <Paragraph mode="primary">Показать еще 5 билетов!</Paragraph>
        </Button>
      </div>
    </div>
  );
}

export { AviasalesSort };
