import React, { useEffect } from 'react';
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
	useEffect(() => {
		console.log(chartWeatherConditions);
	}, [chartWeatherConditions]);

	return (
		<LineChart
			name='Hourly Forecast'
			width={800}
			height={350}
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
