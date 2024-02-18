import { ButtonHTMLAttributes } from "react";
import classes from "./Button.module.scss";
import classNames from "classnames";

type IButtonProps = {
  mode: "primary";
  type?: "active" | "disabled";
  wide?: boolean;
  children: React.ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type">;

function Button({ mode, type, wide, children, className, ...props }: IButtonProps) {
  return (
    <button
      {...props}
      type="button"
      className={classNames(className, classes.button, {
        [classes.primaryMode]: mode === "primary",
        [classes.activeType]: type === "active",
        [classes.wide]: wide,
      })}
    >
      {children}
    </button>
  );
}

export { Button };
