import classNames from "classnames";

interface Props {
  icon: JSX.Element;
  text?: string;
  onClick(): void;
  disabled?: boolean;
}

const containerClasses = (disabled: boolean) =>
  classNames(
    "h-6",
    "w-6",
    "flex",
    "justify-center",
    "items-center",
    "cursor-pointer",
    "gap-2",
    "text-sm",
    "tracking-tighter",
    {
      "cursor-not-allowed": disabled,
    },
    { "text-gray-500": disabled }
  );

export const IconButton = (props: Props) => {
  const { icon, text, onClick, disabled } = props;

  return (
    <div className={containerClasses(!!disabled)} onClick={() => onClick()}>
      {text}
      {icon}
    </div>
  );
};
