import React, { useEffect, useState } from "react";
import { useGlobalState } from "./State";

function CopyClipBoard({
  url,
  whenCopied,
  NotCopied,
}: {
  url: string;
  whenCopied: React.ReactNode;
  NotCopied: React.ReactNode;
}) {
  const { dispatch } = useGlobalState();
  const [isclipBoard, setClipBoard] = useState(false);

  const addToClipBoard = async (url: string) => {
    const response = navigator.clipboard;
    response
      .writeText(url)
      .then((data) => {
        setClipBoard(true);
        dispatch;
      })
      .catch((err) => {
        dispatch({
          type: "SHOW_TOAST",
          payload: { type: "ERROR", message: err.message },
        });
      });
  };
  useEffect(() => {
    setTimeout(() => {
      setClipBoard(false);
    }, 5000);
  });
  return (
    <div>
      {!isclipBoard ? (
        <button onClick={() => addToClipBoard(url)} className="text-blue-600">
          {whenCopied}
        </button>
      ) : (
        <button disabled className="text-emerald-600">
          {NotCopied}
        </button>
      )}
    </div>
  );
}

export default CopyClipBoard;
