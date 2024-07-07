import { useEffect, useState } from "react";

export function LinksActivator() {
  const [hostName, setHostName] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      setHostName(window.location.origin);
    }
  }, []);

  return hostName;
}
