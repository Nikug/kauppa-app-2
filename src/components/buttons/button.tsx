import React from "react";
import classNames from "classnames";

const classes = classNames(
  "py-2",
  "px-4",
  "text-white",
  "font-semibold",
  "rounded-lg",
  "shadow-md",
  "bg-green-400",
  "hover:bg-green-500",
  "focus:outline-none",
  "focus:ring-2",
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
  const { text, className, ...rest } = props;

  return (
    <button className={classNames(classes, className)} {...rest}>
      {text}
    </button>
  );
};
