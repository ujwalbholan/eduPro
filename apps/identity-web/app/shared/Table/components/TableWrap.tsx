import React from "react";
import { classes } from "../classes/Table.class";
import { cx } from "../utils/utils";

export interface TableWrapProps {
  children: React.ReactNode;
  sticky?: boolean;
  className?: string;
  /** Forwarded ref so DataTable can wire up scroll listeners for virtualization. */
  scrollRef?: React.Ref<HTMLDivElement>;
  onScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
  style?: React.CSSProperties;
}

/** Outer scroll boundary. Owns horizontal overflow and (optionally) the fixed-height viewport used for virtualization. */
export function TableWrap({
  children,
  sticky,
  className,
  scrollRef,
  onScroll,
  style,
}: Readonly<TableWrapProps>) {
  return (
    <div
      ref={scrollRef}
      onScroll={onScroll}
      className={cx(classes.wrap, sticky && classes.wrapSticky, className)}
      style={style}
      data-dt-root=""
    >
      {children}
    </div>
  );
}
