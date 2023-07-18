import React, { useEffect, useState } from 'react';
import { getSwsSolarWindData } from '../utils/axios';
import SpaceWeatherChart from '../Components/SpaceWeatherChart';

function Aurora() {
	const [solarWindConditions, setSolarWindConditions] = useState([]);
	const [planetaryKpIndex, setPlanetaryKpIndex] = useState([]);
	const [filteredSolarConditions, setFilteredSolarConditions] = useState([]);
	const [filteredKpIndexData, setFilteredKpIndexData] = useState([]);
	const [loading, setLoading] = useState(true);

	const filterKpIndexData = (planetaryKpIndexData) => {
		console.log('Filtering kp index data...');
		console.log(planetaryKpIndex);

		planetaryKpIndex.shift();

		const hourlyData = [];

		for (const minuteData of planetaryKpIndexData) {
			const timeTag = minuteData?.time_tag;
			const kpIndex = minuteData?.estimated_kp;

			const hour = new Date(timeTag).getUTCHours();
			const minute = new Date(timeTag).getUTCMinutes();
			const second = new Date(timeTag).getUTCSeconds();
			const tzOffset = new Date(timeTag).getTimezoneOffset();
			if (minute === 0 && second === 0) {
				const hourlyKpForecast = {
					timeTag: `${hour} UCT`,
					kpIndex: kpIndex,
				};
				hourlyData.push(hourlyKpForecast);
				console.log(hourlyKpForecast);
			}
		}

		return hourlyData;
	};

	// const fetchSolarWindData = async () => {
	// 	console.log('fetching solar wind data...');
	// 	try {
	// 		const solarWindData = await getSwsSolarWindData();
	// 		console.log(solarWindData);
	// 		return solarWindData;
	// 	} catch (error) {
	// 		console.error(error);
	// 		throw error;
	// 	}
	// };

	useEffect(() => {
		fetch('https://services.swpc.noaa.gov/json/planetary_k_index_1m.json')
			.then((response) => {
				if (response.ok) {
					return response.json();
				}
			})
			.then((data) => {
				console.log(data);
				setPlanetaryKpIndex(data);
			})
			.catch((error) => {
				console.error('Error fetching solar wind data');
			});
	}, []);

	useEffect(() => {
		const filteredKpIndexData = filterKpIndexData(planetaryKpIndex);
		console.log(filteredKpIndexData);
		setFilteredKpIndexData(filteredKpIndexData);
	}, [planetaryKpIndex]);

	// const filterSolarWindData = (solarWindData) => {
	// 	console.log('filtering solarWindData...');
	// 	console.log(solarWindData);

	// 	const header = solarWindData.shift();
	// 	console.log(solarWindData);

	// 	const hourlyData = [];

	// 	for (const minuteData of solarWindData) {
	// 		const timeTag = minuteData[0];

	// 		const minute = new Date(timeTag).getUTCMinutes();
	// 		const second = new Date(timeTag).getUTCSeconds();

	// 		if (minute === 0 && second === 0) {
	// 			hourlyData.push(solarWindData[i]);
	// 		}
	// 	}

	// 	console.log(hourlyData);
	// 	return hourlyData;
	// };

	// useEffect(() => {
	// 	fetch('https://services.swpc.noaa.gov/products/solar-wind/mag-1-day.json')
	// 		.then((response) => {
	// 			if (response.ok) {
	// 				return response.json();
	// 			}
	// 		})
	// 		.then((data) => {
	// 			console.log(data);
	// 			setSolarWindConditions(data);
	// 			console.log(solarWindConditions);
	// 		})
	// 		.catch((error) => {
	// 			console.error('Error fetching solar wind data');
	// 		})
	// 		.finally(() => {
	// 			setLoading(false);
	// 		});
	// }, []);

	// useEffect(() => {
	// 	console.log(solarWindConditions);
	// 	const filtered = filterSolarWindData(solarWindConditions);
	// 	console.log(filtered);
	// 	setFilteredSolarConditions(filtered);
	// 	console.log(filteredSolarConditions);
	// }, [solarWindConditions]);

	// useEffect(() => {
	// 	if (!loading && solarWindConditions !== []) {
	// 		console.log(solarWindConditions);
	// 		filterSolarWindData(solarWindConditions);
	// 	}
	// }, [solarWindConditions]);

	return (
		<>
		<div
		className='masthead'
		id='topOfPage'
		style={{
					backgroundImage: 'url(/assets/img/pink-grey-background-image.svg)',
		}}>
		{filterKpIndexData ? ( 
<div className='current-forecast mx-auto'>
			<div className='chart-container'>
				<div>
					<p className='m-auto'>Hourly Forecast</p>
				</div>
				<SpaceWeatherChart solarWeatherData={filteredKpIndexData} />
			</div>
		</div>
		) : (
			<div>
				Loading...
				</div>
		)}
		</div>
		</>
		
	);
}

export default Aurora;
