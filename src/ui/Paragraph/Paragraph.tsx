import { ParamHTMLAttributes } from "react";
import classNames from "classnames";
import classes from "./Paragraph.module.scss";

type IParagraphProps = {
  mode: "primary" | "success" | "secondary";
  size?: "small" | "medium";
  children: React.ReactNode;
} & ParamHTMLAttributes<HTMLParagraphElement>;

function Paragraph({ mode, size, children, className }: IParagraphProps) {
  return (
    <p
      className={classNames(className, classes.paragraph, {
        [classes.primaryMode]: mode === "primary",
        [classes.successMode]: mode === "success",
        [classes.secondaryMode]: mode === "secondary",
        [classes.smallSize]: size === "small" || !size,
        [classes.mediumSize]: size === "medium",
      })}
    >
      {children}
    </p>
  );
}

export { Paragraph };
