import React from "react";
import Papa from "papaparse";

function DownloadCSVFile() {
  const headers = [
    "code",
    "name",
    "description",
    "sessionName",
    "sessionDescription",
    "sessionCode",
    "durationInMinutes",
  ]; // Define your headers here

  const downloadCSV = () => {
    const csvData = Papa.unparse({ fields: headers, data: [] });

    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "courseUploadEmptyModel.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <button onClick={downloadCSV} className="text-blue-700 hover:underline">
        Download CSV
      </button>
    </div>
  );
}

export default DownloadCSVFile;
