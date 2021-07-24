import React from "react";
import classNames from "classnames";

const styles = classNames(
  "px-1",
  "border-2",
  "rounded",
  "border-opacity-50",
  "border-green-400",
  "hover:border-green-500",
  "focus:border-green-500",
  "focus:outline-none"
);

export const TextInput = React.forwardRef(
  (props: JSX.IntrinsicElements["input"], ref: React.Ref<HTMLInputElement>) => {
    const { className, ...rest } = props;

    return (
      <input
        {...rest}
        ref={ref}
        type="text"
        className={classNames(styles, className)}
      />
    );
  }
);
