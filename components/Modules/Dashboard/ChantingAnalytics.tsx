"use client";
import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useGlobalState } from "@/Utils/State";
ChartJS.register(ArcElement, Tooltip, Legend);
function ChantingAnalytics({
  response,
}: {
  response: {
    japaRounds: string;
    participantCount: number;
  }[];
}) {
  const { state } = useGlobalState();
  const [totalParticipants, setTotalParticipants] = useState<number>(0);
  const [chantingZeroRounds, setChantingZeroRounds] = useState<number>(0);
  const [chantingMoreThanZeroRounds, setChantingMoreThanZeroRounds] =
    useState<number>(0);

  useEffect(() => {
    function countParticipants() {
      let total = 0;
      let zeroRoundsCount = 0;
      let moreThanZeroRoundsCount = 0;
      response.forEach((item) => {
        const rounds = parseInt(item.japaRounds.split(" ")[0]); // Extract the number of rounds
        total += item.participantCount;
        if (rounds === 0) {
          zeroRoundsCount += item.participantCount;
        } else {
          moreThanZeroRoundsCount += item.participantCount;
        }
      });
      setTotalParticipants(total);
      setChantingZeroRounds(zeroRoundsCount);
      setChantingMoreThanZeroRounds(moreThanZeroRoundsCount);
    }

    if (response) {
      countParticipants();
    }
  }, [response]);

  const zeroRoundsPercentage = (chantingZeroRounds / totalParticipants) * 100;
  const moreThanZeroRoundsPercentage =
    (chantingMoreThanZeroRounds / totalParticipants) * 100;

  const data = {
    labels: [
      `Not Chanting ${zeroRoundsPercentage.toFixed(2)} %`,
      `Chanting in ${moreThanZeroRoundsPercentage.toFixed(2)} %`,
    ],
    datasets: [
      {
        data: [zeroRoundsPercentage, moreThanZeroRoundsPercentage],
        backgroundColor: ["#36A2EB", "#FF6384"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384"],
        borderColor:
          state.theme.theme === "LIGHT"
            ? ["rgb(255 255 255)", "rgb(255 255 255)"]
            : ["rgb(12 10 9)", "rgb(12 10 9)"], // Specify border color here
        borderWidth: 1, // Specify border width if needed
      },
    ],
  };

  return (
    <div
      className={`w-full rounded-[40px] max-w-[90vw] ${
        state.theme.theme === "LIGHT"
          ? "bg-gray-50"
          : "bg-stone-900 bg-opacity-30"
      }`}
    >
      <div className="font-bold px-5 py-2 text-xl">Chanting Statistics</div>
      <div className="p-5 lg:w-full ">
        <Doughnut data={data} width={300} height={300} />
      </div>
    </div>
  );
}

export default ChantingAnalytics;
