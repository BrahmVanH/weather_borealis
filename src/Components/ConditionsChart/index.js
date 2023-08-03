import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
} from 'recharts';

function Chart(chartWeatherConditions) {
	const tooltipStyle = {
		padding: '.5rem',
		backgroundColor: 'rgb(33, 37, 41, 0.8)',
		borderRadius: '15px',
	};
	const isSmallScreen = useMediaQuery({ maxWidth: 600 });
	const isMobileScreen = useMediaQuery({ maxWidth: 768 });
	const isMediumScreen = useMediaQuery({ maxWidth: 992 });
	const isLargeScreen = useMediaQuery({ minWidth: 992 });

	const smallChartSize = { height: 200, width: 400 };
	const mediumChartSize = { height: 300, width: 533 };
	const largeChartSize = { height: 350, width: 800 };

	const [chartSize, setChartSize] = useState(smallChartSize);

	const queryScreenSize = () => {
		if (isSmallScreen) {
			setChartSize(smallChartSize);
		} else if (isMobileScreen) {
			setChartSize(smallChartSize);
		} else if (isMediumScreen) {
			setChartSize(mediumChartSize);
		} else if (isLargeScreen) {
			setChartSize(largeChartSize);
		} else {
			setChartSize(largeChartSize);
		}
	};

	useEffect(() => {
		queryScreenSize();
	}, []);

	useEffect(() => {
		console.log(chartWeatherConditions);
	}, [chartWeatherConditions]);

	return (
		<LineChart
			name='Hourly Forecast'
			width={chartSize.width}
			height={chartSize.height}
			data={chartWeatherConditions.chartConditions}
			style={{
				background: '#222',
				color: '#fff',
				padding: '0.5rem',
				
				
			}}>
			<CartesianGrid strokeDasharray='3 3' />
			<XAxis dataKey='hour' domain={[1, 12]} />
			<YAxis yAxisId='left' domain={[0, 100]} />
			<YAxis yAxisId='right' orientation='right' domain={[0, 50]} />
			<Tooltip contentStyle={tooltipStyle} />
			<Legend height={32} verticalAlign='top' align='left' />
			<Line
				name='Humidity (%)'
				legendType='line'
				type='monotone'
				dataKey='humidity'
				stroke='#8884d8'
				yAxisId='left'
			/>
			<Line
				name='Temperature (°F)'
				legendType='line'
				type='monotone'
				dataKey='temp'
				stroke='#82ca9d'
				yAxisId='left'
			/>
			<Line
				name='Wind speed (mph)'
				legendType='line'
				type='monotone'
				dataKey='windSpeed'
				stroke='#ffc658'
				yAxisId='right'
			/>
		</LineChart>
	);
}

export default Chart;
