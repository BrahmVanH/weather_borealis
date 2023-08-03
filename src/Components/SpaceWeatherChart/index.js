import { setSelectionRange } from '@testing-library/user-event/dist/utils';
import React, { useState, useEffect } from 'react';
import createUtilityClassName from 'react-bootstrap/esm/createUtilityClasses';
import { useMediaQuery } from 'react-responsive';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const SpaceWeatherChart = (solarWeatherData) => {
	const isSmallScreen = useMediaQuery({ maxWidth: 600 });
	const isMobileScreen = useMediaQuery({ maxWidth: 768 });
	const isMediumScreen = useMediaQuery({ maxWidth: 992 });
	const isLargeScreen = useMediaQuery({ minWidth: 992 });

	const smallChartSize = { height: 200, width: 400 };
	const mediumChartSize = { height: 300, width: 533 };
	const largeChartSize = { height: 400, width: 800 };
	
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
