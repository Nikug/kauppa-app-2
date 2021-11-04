import React, { ReactNode, useCallback, useEffect, useRef } from "react";

interface Props {
  onOutsideClick(): void;
  children?: ReactNode;
}

export const DetectOutsideClick = (props: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { onOutsideClick, children } = props;

  const handleClick = useCallback(
    (event: MouseEvent | React.MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        onOutsideClick();
      }
    },
    [containerRef, onOutsideClick]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [handleClick]);

  return (
    <div className="w-full" ref={containerRef} onClick={handleClick}>
      {children}
    </div>
  );
};
