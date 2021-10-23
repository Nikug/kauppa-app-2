import classNames from "classnames";

interface Props {
  icon: JSX.Element;
  onClick(): void;
  disabled?: boolean;
}

const containerClasses = (disabled: boolean) =>
  classNames("w-6", "h-6", "cursor-pointer", {
    "cursor-not-allowed": disabled,
  });

export const IconButton = (props: Props) => {
  const { icon, onClick, disabled } = props;

  return (
    <div className={containerClasses(!!disabled)} onClick={() => onClick()}>
      {icon}
    </div>
  );
};
