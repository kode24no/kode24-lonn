import React, { useLayoutEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

import {
	tidy,
	groupBy,
	summarize,
	sum,
	mean,
	desc,
	arrange,
	fixedOrder,
} from "@tidyjs/tidy";

import data from "./assets/processed.json";
import { VerticalBar } from "./atoms";

import { Navbar } from "./components";
import { Row } from "./lib";
import { generateMunicipalitySalaryChart, generateSalaryAgeChart, SalaryData } from "./lib/charts";
import { PieChart } from "./atoms/charts/PieChart/PieChart";
import { generateAgeDistributionChart } from "./lib/charts/age";


const typedData: SalaryData = data as any;

function App() {
	const sortedData = tidy(typedData, arrange([fixedOrder('age', ['20-24', '25-29', '30-34', '35-39', '40-44', '45-49', '50-54', '55-59'])]));

	// For basic charts we can just do the calculation here instead of passing along
	const salaryChart = generateSalaryAgeChart(sortedData);
	const municipalityChart = generateMunicipalitySalaryChart(sortedData);

	const ageDistributionChart = generateAgeDistributionChart(sortedData);

	return (
		<div className="App">
			<Navbar />
			<div className="Charts">
				<section>
					<h2 className="section-title">Lønn</h2>
					<div className="charts-row">
						<VerticalBar  {...salaryChart} />
						<VerticalBar  {...municipalityChart} />
					</div>
				</section>
				<section>
					<h2 className="section-title">Aldersfordeling</h2>
					<div className="charts-row">
						<PieChart  {...ageDistributionChart} />
						<div className="contribute">
							<h3>Din spennende graf!</h3>
							<p>Har du lyst til å bidra? Målet er å gjøre dette til et felleskapsprosjekt for kode24 sine lesere. Hvor folke kan lære om visualiseringer og bidra til noe som alle utviklere har nytte av.</p>
							<a className="github-link" href="https://github.com/MaximilianLloyd/kode24-lonn">
								<img width="50" src="/github.svg" alt="Github logo" />
							</a>
						</div>
						{/* <VerticalBar  {...municipalityChart} /> */}
					</div>
				</section>
			</div>
		</div>
	);
}

export default App;
