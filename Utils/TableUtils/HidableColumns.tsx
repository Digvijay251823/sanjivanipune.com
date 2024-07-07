"use client";
import React, { useEffect, useState } from "react";

interface HidableProps {
  columnNamesArray?: string[];
  stylesClassNames?: string;
  ColumnToHide?: string;
  children: React.ReactNode;
  isColumnHeader: boolean;
}

export function HidableColumns({
  columnNamesArray,
  stylesClassNames,
  ColumnToHide,
  children,
  isColumnHeader,
}: HidableProps) {
  const [isHidden, setIsHidden] = useState(false);
  useEffect(() => {
    const hidable = ColumnToHide
      ? columnNamesArray
        ? columnNamesArray?.includes(ColumnToHide)
        : false
      : false;
    setIsHidden(hidable);
  }, [columnNamesArray, ColumnToHide]);
  if (isHidden) {
    return null;
  } else {
    return (
      <>
        {isColumnHeader ? (
          <th className={stylesClassNames}>{children}</th>
        ) : (
          <td className={stylesClassNames}>{children}</td>
        )}
      </>
    );
  }
}
