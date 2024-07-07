"use client";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import { useGlobalState } from "@/Utils/State";
ChartJS.register(...registerables);

const ChantingroundwiseData = {
  labels: [
    "0 Rounds",
    "1 Rounds",
    "2 Rounds",
    "3 Rounds",
    "4 Rounds",
    "5 Rounds",
    "6 Rounds",
    "7 Rounds",
    "8 Rounds",
    "9 Rounds",
    "10 Rounds",
    "11 Rounds",
    "12 Rounds",
    "13 Rounds",
    "15 Rounds",
    "16 Rounds",
  ],
  datasets: [
    {
      label: "Chanting Stati",
      data: Array(16).fill(0),
      backgroundColor: ["#36A2EB"],
      hoverBackgroundColor: ["#36A2EB"],
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
    },
  ],
};

function Chantingroundwise({
  response,
}: {
  response: {
    japaRounds: string;
    participantCount: number;
  }[];
}) {
  const { state } = useGlobalState();
  const [chartData, setChartData] = useState(ChantingroundwiseData);

  useEffect(() => {
    if (typeof response !== "undefined") {
      const updatedData = { ...ChantingroundwiseData }; // Copy the initial data object

      // Update the data array with participant counts from the response
      response.forEach((item) => {
        const index = updatedData.labels.indexOf(item.japaRounds);
        if (index !== -1) {
          updatedData.datasets[0].data[index] = item.participantCount;
        }
      });

      setChartData(updatedData);
    }
  }, [response]);

  return (
    <div
      className={`w-full rounded-[40px] ${
        state.theme.theme === "LIGHT"
          ? "bg-gray-50"
          : "bg-stone-900 bg-opacity-30"
      }`}
    >
      <div className="font-bold px-5 py-2 text-xl">Chanting Statistics</div>
      <div className="p-5 overflow-x-auto md:w-[500px] w-[90vw] ">
        <Bar
          data={ChantingroundwiseData}
          options={{
            indexAxis: "y",
            scales: {
              x: {
                min: 0,
                max: 16,
              },
            },
          }}
          height={400}
        />
      </div>
    </div>
  );
}

export default Chantingroundwise;
