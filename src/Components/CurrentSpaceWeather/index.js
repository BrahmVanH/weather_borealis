import React, { useEffect, useState } from 'react';

export default function CurrentSpaceWeather(spaceWeather) {

	
	const weatherTextStyle = {
		fontSize: '1rem',
		width: '75%',
	};

	useEffect(() => {
		console.log(spaceWeather);
	}, []);

	return (
		<div className='d-flex justify-content-center' data-speed='0.5'>
			<div className='weather-text-boxes col-6 col-md-3'>
				<div className='weather-text-box-border'>
					<p style={weatherTextStyle}>
						<span className='current-weather-bold-text'>Kp Index: </span>
						{spaceWeather.currentKp}
					</p>
					<p style={weatherTextStyle}>
						<span className='current-weather-bold-text'>Solar Wind: </span>
						{/* {spaceWeather.currentSolarWindSpeed} km/h */}
					</p>
					<p style={weatherTextStyle}>
						<span className='current-weather-bold-text'>Particle Density</span>
						{/* {spaceWeather.particleDensity} */}
					</p>
					<p style={weatherTextStyle}>
						<span className='current-weather-bold-text'>Bz </span>
						{/* {spaceWeather.bz} */}
					</p>
					<p style={weatherTextStyle}>
						<span className='current-weather-bold-text'>Bt </span>
						{spaceWeather.bt}
					</p>
					<p style={weatherTextStyle}>
						<span className='current-weather-bold-text'>Solar Wind Propagation Delay Between ACE and Earth </span>
						{/* solar wind propagation delay between ace satellite and earth */}
					</p>
				</div>
			</div>
		</div>
	);
}
