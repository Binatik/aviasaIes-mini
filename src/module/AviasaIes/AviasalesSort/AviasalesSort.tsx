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
            <Paragraph size="medium" mode="success">
              13 400 Р{" "}
            </Paragraph>
            <Paragraph size="medium" mode="success">
              13 400 Р{" "}
            </Paragraph>
          </div>
        </Card>
      </div>
    </div>
  );
}

export { AviasalesSort };
