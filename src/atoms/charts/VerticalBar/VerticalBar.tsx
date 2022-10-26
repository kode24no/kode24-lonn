import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import type { ChartOptions } from "chart.js";

import { VerticalBarProps } from "../../../lib/charts";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const VerticalBar: React.FC<VerticalBarProps> = ({ chart, title }) => {
  const { datasets, labels } = chart;

  const options: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
  };

  const dataSets = {
    labels,
    // Perhaps make into utlity function
    datasets: datasets.map((dataset) => ({
      data: dataset.data,
      label: dataset.label,
      backgroundColor: dataset.backgroundColor
        ? dataset.backgroundColor
        : "hsl(327, 81%, 54%)",
    })),
  };

  return (
    <div className="chart">
      <Bar options={options} data={dataSets} />;
    </div>
  );
};
