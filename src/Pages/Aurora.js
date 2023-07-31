import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

import SpaceWeatherChart from '../Components/SpaceWeatherChart';
import {
	fetchNoaaAlerts,
	fetchPlanetaryKpIndex,
	fetchSolarWind1Hour,
	fetchXrayFlare6Hour,
	fetchXrayFlare24Hour,
	fetchSunspotReport,
	fetchSolarRadioFlux,
	fetchSolarRadioFluxPrediction,
} from '../utils/fetches';

import auroraBurned from '../assets/img/auroraBurned.png';

function Aurora() {
	const [solarWindConditions, setSolarWindConditions] = useState([]);
	const [planetaryKpIndexData, setPlanetaryKpIndexData] = useState([]);
	const [filteredSolarConditions, setFilteredSolarConditions] = useState([]);
	const [filteredKpIndexData, setFilteredKpIndexData] = useState([]);
	const [currentKp, setCurrentKp] = useState([]);
	const [currentSolarWindConditions, setCurrentSolarWindConditions] = useState([]);
	const [currentSolarWindSpeed, setCurrentSolarWindSpeed] = useState([]);
	const [spaceWeather, setSpaceWeather] = useState({
		noaaAlerts: "",
		currentKp: "",
		currentSolarWindConditions: "",
		

	})

	const [loading, setLoading] = useState(true);

	const weatherTextStyle = {
		fontSize: '1rem',
		width: '75%',
	};

	useEffect(() => {
		fetchSolarWind1Hour()
			.then((data) => setSolarWindConditions(data))
			.catch((error) => console.error(error));
	}, []);

	const setCurrentSolarWindObjects = (currentSolarWindConditions) => {
		const [timeTag, speed, density, temperature, bx, by, bz, bt, vx, vy, vz] = currentSolarWindConditions;
		console.log(timeTag);
	};

	const filterKpIndexData = (planetaryKpIndexData) => {
		console.log('Filtering kp index data...');
		console.log(planetaryKpIndexData);

		planetaryKpIndexData.shift();

		const hourlyData = [];
		let currentHourKp = planetaryKpIndexData[300]?.kp_index;
		setCurrentKp(currentHourKp);
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

	useEffect(() => {
		fetchPlanetaryKpIndex()
			.then((data) => setPlanetaryKpIndexData(data))
			.catch((error) => console.error(error));
	}, []);

	useEffect(() => {
		const filteredKpIndexData = filterKpIndexData(planetaryKpIndexData);
		console.log(filteredKpIndexData);
		setFilteredKpIndexData(filteredKpIndexData);
	}, [planetaryKpIndexData]);

	useEffect(() => {
		console.log(solarWindConditions[1]);
	}, [solarWindConditions]);

	useEffect(() => {
		setSpaceWeather({ currentSolarWindConditions: solarWindConditions[1]});
		console.log(solarWindConditions[1]);
	}, [solarWindConditions]);

	useEffect(() => {
		
	});

	return (
		<>
			<div
				className='masthead'
				id='topOfPage'
				style={{
					backgroundImage: `url(${auroraBurned})`,
				}}>
				<div className='container' id='currentWeather' data-speed='0.5'>
					<div className='weather-text-boxes col-2 col-md-2'>
						<div className='weather-text-box-border'>
							<p style={weatherTextStyle}>
								<span className='current-weather-bold-text'>Kp Index: </span>
								{currentKp}
							</p>
							<p style={weatherTextStyle}>
								<span className='current-weather-bold-text'>Solar Wind: </span>
								{currentSolarWindSpeed} km/h
							</p>
							<p style={weatherTextStyle}>
								<span className='current-weather-bold-text'>Conditions: </span>
							</p>
						</div>
					</div>
				</div>
				{filterKpIndexData ? (
					<div className='current-forecast mx-auto'>
						<div className='chart-container'>
							<div>
								<p className='m-auto'>Hourly Forecast</p>
							</div>
							<SpaceWeatherChart solarWeatherData={filteredKpIndexData} />
						</div>
						<div>
							<Button onClick={fetchNoaaAlerts}>NOAA Alerts</Button>
							<Button onClick={fetchPlanetaryKpIndex}>Planetary kp index</Button>
							<Button onClick={fetchSolarWind1Hour}>Solar Wind 1-Hour</Button>
							<Button onClick={fetchXrayFlare6Hour}>X-ray 6-Hour</Button>
							<Button onClick={fetchXrayFlare24Hour}>X-ray 24-hour</Button>
							<Button onClick={fetchSunspotReport}>Sunspot Report</Button>
							<Button onClick={fetchSolarRadioFlux}>10.7cm Flux</Button>
							<Button onClick={fetchSolarRadioFluxPrediction}>10.7cm Flux Prediction</Button>
						</div>
					</div>
				) : (
					<div>Loading...</div>
				)}
			</div>
		</>
	);
}

export default Aurora;

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
