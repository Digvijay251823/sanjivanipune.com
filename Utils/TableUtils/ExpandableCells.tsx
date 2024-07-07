import React, { useEffect, useState } from "react";

function ExpandableCells({ children }: { children: React.ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(false);
  useEffect(() => {
    if (isExpanded) {
      setTimeout(() => {
        setIsExpanded(false);
      }, 5000);
    }
  }, [isExpanded]);
  return <div>{children}</div>;
}

export default ExpandableCells;
