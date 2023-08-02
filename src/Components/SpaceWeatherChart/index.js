import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const SpaceWeatherChart = (solarWeatherData) => {
	const [screenSize, setScreenSize] = useState({
		dynamicWidth: window.innerWidth,
		dynamicHeight: window.innerHeight,
	});

	const [chartSize, setChartSize] = useState({
	});

	const smallChartSize = { height: 200, width: 400 };
	const mediumChartSize = { height: 300, width: 533 };
	const largeChartSize = { height: 400, width: 800 };

	const updateViewport = () => {
		setScreenSize({
			dynamicWidth: window.innerWidth,
			dynamicHeight: window.innerHeight,
		});

		if (screenSize.dynamicWidth <= 600) {
			setChartSize(smallChartSize);
		} else if (600 < screenSize.dynamicWidth < 768) {
			setChartSize(smallChartSize);
		} else if (768 < screenSize.dynamicWidth < 992) {
			setChartSize(mediumChartSize);
		} else {
			setChartSize(largeChartSize);
		}
	};
	useEffect(() => {
		updateViewport();
		console.log(screenSize);
		console.log(chartSize);
		// window.addEventListener('resize', updateViewport);

		// return () => {
		// 	window.removeEventListener('resize', updateViewport);
		// };
	}, []);

	return (
		<LineChart width={chartSize.width} height={chartSize.height} data={solarWeatherData.solarWeatherData}>
			<CartesianGrid strokeDasharray='3 3' />
			<XAxis dataKey='timeTag' />
			<YAxis />
			<Tooltip />
			<Legend />
			<Line type='monotone' dataKey='kpIndex' stroke='#695e74' />
			{/* <Line type='monotone' dataKey='by_gsm' stroke='#82ca9d' />
			<Line type='monotone' dataKey='bz_gsm' stroke='#ffc658' />
			<Line type='monotone' dataKey='lon_gsm' stroke='#ff7f50' />
			<Line type='monotone' dataKey='lat_gsm' stroke='#0088FE' /> */}
			{/* <Line type='monotone' dataKey='bt' stroke='#00C49F' /> */}
		</LineChart>
	);
};

export default SpaceWeatherChart;
