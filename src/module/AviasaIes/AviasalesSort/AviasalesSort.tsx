import { Button } from "../../../ui/Button/Button"
import classes from "./AviasalesSort.module.scss";

function AviasalesSort() {
  return (
    <div className={classes.aviasalesSort}>
      <Button mode="primary" wide type="active" disabled>
        Самый дешевый
      </Button>
      <Button mode="primary" wide>
        Самый быстрый
      </Button>
      <Button mode="primary" wide>
        Оптимальный
      </Button>
    </div>
  )
}

export { AviasalesSort }