import classNames from "classnames";
import classes from "./Card.module.scss";
import { HTMLAttributes } from "react";

type ICardProps = {
  mode: "primary";
  size?: "small" | "medium" | "none";
  children: React.ReactNode;
} & HTMLAttributes<HTMLDivElement>;

function Card({ mode, size, children, className }: ICardProps) {
  return (
    <div
      className={classNames(className, classes.card, {
        [classes.primaryMode]: mode === "primary",
        [classes.smallSize]: size === "small" || !size,
        [classes.mediumSize]: size === "medium",
      })}
    >
      {children}
    </div>
  );
}

export { Card };
