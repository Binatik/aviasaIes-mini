import { InputHTMLAttributes } from "react";
import classes from "./Checkbox.module.scss";
import classNames from "classnames";

type ICheckboxProps = {
  label: string;
  htmlForId: string;
  classNameItem?: string;
} & InputHTMLAttributes<HTMLInputElement>;

function Checkbox({ label, htmlForId, classNameItem, ...props }: ICheckboxProps) {
  return (
    <div
      className={classNames(classes.checkboxItem, {
        classNameItem: classNameItem,
      })}
    >
      <input {...props} type="checkbox" className={classes.checkbox} id={htmlForId} />
      <label htmlFor={htmlForId}>
        <span>{label}</span>
      </label>
    </div>
  );
}

export { Checkbox };
