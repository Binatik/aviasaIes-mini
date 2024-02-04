import { AnchorHTMLAttributes } from "react";
import { ReactComponent as Cricle } from "../../assets/icons/cricle.svg";
import { ReactComponent as Plane } from "../../assets/icons/plane.svg";
import classes from "./Logo.module.scss";
import classNames from "classnames";

type ILogoProps = {
  mode: "primary";
  size?: "small" | "medium";
} & AnchorHTMLAttributes<HTMLAnchorElement>;

function Logo({ mode, size, className, ...props }: ILogoProps) {
  return (
    <a
      {...props}
      className={classNames(className, classes.logo, {
        [classes.primaryMode]: mode === "primary",
        [classes.primaryMode]: mode === "primary",
        [classes.smallSize]: size === "small" || !size,
        [classes.mediumSize]: size === "medium",
      })}
    >
      <Cricle />
      <Plane
        className={classNames(className, classes.plane, {
          [classes.smallSize]: size === "small" || !size,
          [classes.mediumSize]: size === "medium",
        })}
      />
    </a>
  );
}

export { Logo };
