import { groupBy, n, summarize, tidy } from "@tidyjs/tidy";

import { PieChartProps, SalaryData } from ".";

export const generateAgeDistributionChart = (
  data: SalaryData
): PieChartProps => {
  const groups = tidy(
    data,
    groupBy("age", [summarize({ total: n() })], groupBy.entriesObject())
  );

  const ages = groups.map((group) => group.key as string);

  return {
    title: "Aldersfordeling",
    chart: {
      labels: ages,
      datasets: [
        {
          label: "Privat sektor",
          data: groups.map((result) => {
            const [count] = result.values;
            return count.total;
          }),
          backgroundColor: [
            "red",
            "blue",
            "purple",
            "green",
            "wheat",
            "orange",
            "teal",
            "pink",
          ],
        },
      ],
    },
  };
};
