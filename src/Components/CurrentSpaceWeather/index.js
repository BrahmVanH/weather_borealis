import React, { useEffect, useState } from 'react';

export default function CurrentSpaceWeather({ spaceWeather }) {
	const [currentSolarWindSpeed, setCurrentSolarWindSpeed] = useState(null);
	const [currentParticleDensity, setCurrentParticleDensity] = useState(null);
	const [currentBz, setCurrentBz] = useState(null);
	const [currentBt, setCurrentBt] = useState(null);
	const [delayAceEarth, setDelayAceEarth] = useState(null);
	const weatherTextStyle = {
		fontSize: '1rem',
		width: '75%',
	};

	const { currentKp, currentSolarWindConditions } = spaceWeather;

	useEffect(() => {
		console.log(currentKp);
		console.log(currentSolarWindConditions);
	}, []);

	useEffect(() => {
		if (currentSolarWindConditions) {
			setCurrentSolarWindSpeed(currentSolarWindConditions[1]);
			setCurrentParticleDensity(currentSolarWindConditions[2]);
			setCurrentBz(currentSolarWindConditions[6]);
			setCurrentBt(currentSolarWindConditions[7]);
		}
	}, [spaceWeather]);

	return (
		<div className='d-flex justify-content-center' data-speed='0.5'>
			{spaceWeather ? (
				<div className='weather-text-boxes col-6 col-md-3'>
					<div className='weather-text-box-border'>
						<p style={weatherTextStyle}>
							<span className='current-weather-bold-text'>Kp Index: </span>
							{currentKp}
						</p>
						<p style={weatherTextStyle}>
							<span className='current-weather-bold-text'>Solar Wind: </span>
							{currentSolarWindSpeed} (km/h)
						</p>
						<p style={weatherTextStyle}>
							<span className='current-weather-bold-text'>Particle Density</span>
							{currentParticleDensity} (p/cc)
						</p>
						<p style={weatherTextStyle}>
							<span className='current-weather-bold-text'>Bz </span>
							{currentBz}
						</p>
						<p style={weatherTextStyle}>
							<span className='current-weather-bold-text'>Bt </span>
							{currentBt}
						</p>
						{/* <p style={weatherTextStyle}>
							<span className='current-weather-bold-text'>Solar Wind Propagation Delay Between ACE and Earth </span>
							solar wind propagation delay between ace satellite and earth
						</p> */}
					</div>
				</div>
			) : (
				<div>Loading Current Space Weather...</div>
			)}
		</div>
	);
}
