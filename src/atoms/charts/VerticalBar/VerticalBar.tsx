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
import { VerticalBarProps } from "../../../lib/charts";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export type Position =
  | "top"
  | "left"
  | "right"
  | "bottom"
  | "center"
  | "chartArea"
  | undefined;

export type VerticalBarOptions = {
  responsive: boolean;
  plugins: {
    legend: {
      position: Position;
    };
    title: {
      display: boolean;
      text: string;
    };
  };
};

export const VerticalBar: React.FC<VerticalBarProps> = ({ chart, title }) => {
  const { datasets, labels } = chart;

  const options: VerticalBarOptions = {
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
