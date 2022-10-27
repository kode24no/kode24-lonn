import { distinct, filter, groupBy, mean, summarize, tidy } from "@tidyjs/tidy";
import { Row, Sector } from "..";

export type SalaryData = Row[];

export interface ChartProps<T> {
  title: string;
  chart: T;
}

interface Dataset<T> {
  label: string;
  data: number[];
  backgroundColor?: T;
}

export interface BasicChartProps {
  labels: string[];
  datasets: Dataset<string>[];
}

export interface PieChart {
  labels: string[];
  datasets: Dataset<string[]>[];
}

// Props
export type VerticalBarProps = ChartProps<BasicChartProps>;
export type PieChartProps = ChartProps<PieChart>;

export const generateSalaryAgeChart = (data: SalaryData): VerticalBarProps => {
  const ages = tidy(data, distinct(["age"])).map((row) => row.age);

  const privateSector = tidy(
    data,
    filter((row) => row.sector === Sector.PRIVATE),
    groupBy("age", [summarize({ total: mean("salary") })])
  );

  const publicSector = tidy(
    data,
    filter((row) => row.sector === Sector.PUBLIC),
    groupBy("age", [summarize({ total: mean("salary") })])
  );

  return {
    title: "Lønn etter alder og sektor",
    chart: {
      labels: ages,
      datasets: [
        {
          label: "Privat sektor",
          data: privateSector.map((result) => result.total as number),
        },
        {
          label: "Offentlig sektor",
          data: publicSector.map((result) => result.total as number),
          backgroundColor: "hsl(33, 100%, 50%)",
        },
      ],
    },
  };
};

export const generateMunicipalitySalaryChart = (
  data: SalaryData
): VerticalBarProps => {
  const municipalities = tidy(data, distinct(["municipality"])).map(
    (row) => row.municipality
  );

  const privateSector = tidy(
    data,
    filter((row) => row.sector === Sector.PRIVATE),
    groupBy("municipality", [summarize({ total: mean("salary") })])
  );

  const publicSector = tidy(
    data,
    filter((row) => row.sector === Sector.PUBLIC),
    groupBy("municipality", [summarize({ total: mean("salary") })])
  );

  return {
    title: "Lønn etter fylke og sektor",
    chart: {
      labels: municipalities,
      datasets: [
        {
          label: "Privat sektor",
          data: privateSector.map((result) => result.total as number),
        },
        {
          label: "Offentlig sektor",
          data: publicSector.map((result) => result.total as number),
          backgroundColor: "hsl(33, 100%, 50%)",
        },
      ],
    },
  };
};
