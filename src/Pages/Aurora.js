import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

import NoaaAlerts from '../Components/NOAAAlerts';
import CurrentSpaceWeather from '../Components/CurrentSpaceWeather';
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
	fetchAllTheSpaceWeather,
} from '../utils/fetches';

import auroraBurned from '../assets/img/auroraBurned.png';

function Aurora() {
	const [noaaAlerts, setNoaaAlerts] = useState([]);
	const [solarWindConditions, setSolarWindConditions] = useState([]);
	const [planetaryKpIndexData, setPlanetaryKpIndexData] = useState([]);
	const [filteredSolarConditions, setFilteredSolarConditions] = useState([]);
	const [filteredKpIndexData, setFilteredKpIndexData] = useState([]);
	const [currentKp, setCurrentKp] = useState([]);
	const [spaceWeather, setSpaceWeather] = useState({
		currentKp: null,
		currentSolarWindConditions: null,
	});
	const [spaceWeatherLoaded, setSpaceWeatherLoaded] = useState(false);
	const [loading, setLoading] = useState(true);

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
		fetchNoaaAlerts()
			.then((data) => setNoaaAlerts(data[0]?.message))
			.catch((error) => console.error(error));
	}, []);

	useEffect(() => {
		fetchPlanetaryKpIndex()
			.then((data) => setPlanetaryKpIndexData(data))
			.catch((error) => console.error(error));
	}, []);

	useEffect(() => {
		fetchSolarWind1Hour()
			.then((data) => setSolarWindConditions(data))
			.catch((error) => console.error(error));
	}, []);

	useEffect(() => {
		const filteredKpIndexData = filterKpIndexData(planetaryKpIndexData);
		console.log(filteredKpIndexData);
		setFilteredKpIndexData(filteredKpIndexData);
	}, [planetaryKpIndexData]);

	useEffect(() => {
		console.log(solarWindConditions);
	}, [solarWindConditions]);

	useEffect(() => {
		setSpaceWeather((prevState) => ({ ...prevState, currentKp: currentKp }));
	}, [currentKp]);

	useEffect(() => {
		setSpaceWeather((prevState) => ({ ...prevState, currentSolarWindConditions: solarWindConditions[1] }));
	}, [solarWindConditions]);

	useEffect(() => {
		console.log(solarWindConditions[1]);
	}, [solarWindConditions]);

	useEffect(() => {
		console.log(spaceWeather);
	}, [spaceWeather]);

	useEffect(() => {
		if (spaceWeather.currentKp !== null && spaceWeather.currentSolarWindConditions !== null) {
			setSpaceWeatherLoaded(true);
		}
	}, [spaceWeather]);

	return (
		<>
			<div
				className='masthead'
				id='topOfPage'
				style={{
					backgroundImage: `url(${auroraBurned})`,
				}}>
				<div>
					{noaaAlerts ? (
						<NoaaAlerts noaaAlerts={noaaAlerts} />
					) : (
						<div>
							<p> Loading NOAA Space Weather Alerts... </p>
						</div>
					)}
				</div>
				<div className='d-flex justify-content-center'>
					{spaceWeatherLoaded ? (
						<div className='container'>
							<CurrentSpaceWeather spaceWeather={spaceWeather} />
						</div>
					) : (
						<div>Loading Current Space Weather...</div>
					)}
				</div>

				{filterKpIndexData ? (
					<div className='current-forecast mx-auto'>
						<div className='chart-container'>
							<div>
								<p className='m-auto'>3-Hour KP Forecast</p>
							</div>
							<SpaceWeatherChart solarWeatherData={filteredKpIndexData} />
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
