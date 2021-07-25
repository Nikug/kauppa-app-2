import React from "react";
import classNames from "classnames";

const classes = classNames(
  "py-2",
  "px-4",
  "text-white",
  "font-semibold",
  "rounded",
  "shadow",
  "focus:outline-none",
  "focus:ring-green-400",
  "focus:ring-opacity-75"
);

interface Props {
  text?: JSX.Element | string;
}

export const Button = (
  props: Props &
    React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >
) => {
  const { text, className, disabled, ...rest } = props;

  return (
    <button
      className={classNames(classes, className, {
        "bg-gray-300": disabled,
        "hover:bg-gray-300": disabled,
        "cursor-default": disabled,
        "bg-green-400": !disabled,
        "hover:bg-green-500": !disabled,
        "focus:ring-2": !disabled,
      })}
      {...rest}
    >
      {text}
    </button>
  );
};
