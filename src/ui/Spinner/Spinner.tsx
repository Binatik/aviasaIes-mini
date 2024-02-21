import classNames from "classnames";
import clasess from "./Spinner.module.css";
import { HTMLAttributes } from "react";

type ISpiner = {
  size?: "small" | "medium";
  position?: "start" | "center";
} & HTMLAttributes<HTMLDivElement>;

function Spinner({ className, position, size }: ISpiner) {
  return (
    <div
      className={classNames(className, clasess.spinnerContainer, {
        [clasess.positionStart]: position === "start",
        [clasess.positionCenter]: position === "center" || !position,
      })}
    >
      <div
        className={classNames(clasess.spinner, {
          [clasess.sizeSmall]: size === "small",
          [clasess.sizeMedium]: size === "medium" || !size,
        })}
      ></div>
    </div>
  );
}

export { Spinner };
