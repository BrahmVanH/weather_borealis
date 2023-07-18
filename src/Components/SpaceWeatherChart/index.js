import React from 'react';
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
} from 'recharts';

// Sample data for 7 points over 24 hours
const data = [
	{
		hour: '00:00',
		value1: 10,
		value2: 20,
		value3: 15,
		value4: 25,
		value5: 18,
		value6: 22,
		value7: 12,
	},
	{
		hour: '04:00',
		value1: 15,
		value2: 18,
		value3: 12,
		value4: 20,
		value5: 10,
		value6: 25,
		value7: 16,
	},
	{
		hour: '08:00',
		value1: 12,
		value2: 22,
		value3: 20,
		value4: 18,
		value5: 16,
		value6: 15,
		value7: 14,
	},
	{
		hour: '12:00',
		value1: 25,
		value2: 15,
		value3: 10,
		value4: 16,
		value5: 20,
		value6: 12,
		value7: 18,
	},
	{
		hour: '16:00',
		value1: 18,
		value2: 12,
		value3: 25,
		value4: 10,
		value5: 15,
		value6: 20,
		value7: 22,
	},
	{
		hour: '20:00',
		value1: 22,
		value2: 16,
		value3: 18,
		value4: 15,
		value5: 12,
		value6: 10,
		value7: 25,
	},
	{
		hour: '24:00',
		value1: 12,
		value2: 14,
		value3: 16,
		value4: 22,
		value5: 25,
		value6: 18,
		value7: 15,
	},
];

const SpaceWeatherChart = (solarWeatherData) => {
	console.log(solarWeatherData);
	return (
		<LineChart
			width={800}
			height={400}
			data={solarWeatherData.solarWeatherData}>
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
