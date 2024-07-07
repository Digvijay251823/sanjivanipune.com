import React from "react";

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;
  return `${formattedDay}-${formattedMonth}-${year}`;
}

const DateFormatter = ({ dateString }: { dateString: string }) => {
  const formattedDate = formatDate(dateString);

  return (
    <div className="w-max">
      <p>{formattedDate}</p>
    </div>
  );
};

export default DateFormatter;
