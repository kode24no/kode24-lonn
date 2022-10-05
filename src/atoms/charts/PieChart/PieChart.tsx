import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { PieChartProps } from "../../../lib/charts";

ChartJS.register(ArcElement, Tooltip, Legend);

export const PieChart: React.FC<PieChartProps> = ({ title, chart }) => {
  const { datasets, labels } = chart;

  const options: any = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: title,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            var data = context.dataset.data,
              label = context.label,
              currentValue = context.raw,
              total = 0;

            for (var i = 0; i < data.length; i++) {
              total += data[i];
            }
            var percentage = parseFloat(
              ((currentValue / total) * 100).toFixed(1)
            );

            return label + ": " + currentValue + " (" + percentage + "%)";
          },
        },
      },
    },
  };

  const dataSets = {
    labels,
    // Perhaps make into utlity function
    datasets: datasets.map((dataset) => ({
      data: dataset.data,
      label: dataset.label,
      backgroundColor: dataset.backgroundColor,
    })),
  };

  return (
    <div className="chart">
      <Pie data={dataSets} options={options} />
    </div>
  );
};
