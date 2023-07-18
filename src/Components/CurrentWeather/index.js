import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import ConditionsChart from '../ConditionsChart';
import { useWeatherContext } from '../../utils/GlobalState';
import { FaWind, FaThermometerHalf } from 'react-icons/fa';
import { VscCompass } from 'react-icons/vsc';
import {
	packagePrecipInfo,
	createPrecipObject,
	formatHour,
} from '../../utils/helpers';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

//ADD FUNCTION TO DETERMINE WHERE USE IS BASED ON BROWSER AND SET
// UNITS ACCORDINGLY, BUT ADD TOGGLE TO CHANGE UNITS

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

function CurrentWeather() {
	const main = useRef();
	const smoother = useRef();

	const [state, dispatch] = useWeatherContext();

	const {
		currentDate,
		weatherLocation,
		dataUnits,
		currentWeather,
		currentWeatherIcon,
		forecastWeather,
		forecastWeatherCurrentHour,
		forecastWeatherToday,
	} = state;

	const [chartWeatherConditions, setChartWeatherConditions] = useState([]);

	const [precipObject, setPrecipObject] = useState({});

	const weatherTextStyle = {
		fontSize: '1rem',
		width: '75%',
	};

	const createChartWeatherConditions = () => {
		let chartConditionsArray = [];
		let hourString = '';
		let hourObject = {};
		let formattedHour = '';

		forecastWeatherToday?.hour?.map((hour) => {
			hourString = hour.time.slice(11, 13);
			hourObject = formatHour(hourString);
			formattedHour = `${hourObject.hourFormatted} ${hourObject.meridiemString}`;
			const hourlyCondition = {
				hour: formattedHour,
				temp: hour.temp_f,
				windSpeed: hour.wind_mph,
				humidity: hour.humidity,
			};
			chartConditionsArray.push(hourlyCondition);
		});
		return chartConditionsArray;
	};

	useEffect(() => {
		const precipInfo = packagePrecipInfo(forecastWeatherCurrentHour);
		const precipObject = createPrecipObject(precipInfo);
		setPrecipObject(precipObject);
	}, [forecastWeatherCurrentHour]);

	useEffect(() => {
		const chartConditions = createChartWeatherConditions();
		console.log(`chartConditions: ${chartConditions}`);
		setChartWeatherConditions(chartConditions);
	}, [forecastWeatherToday?.hour]);

	useEffect(() => {
		console.log(forecastWeather);
	}, [forecastWeather]);

	useEffect(() => {
		console.log(currentWeather);
	}, [currentWeather]);

	useEffect(() => {
		console.log(forecastWeatherToday);
		console.log(forecastWeatherToday?.hour);
	}, [forecastWeatherToday]);

	useEffect(() => {
		console.log(chartWeatherConditions);
	}, [chartWeatherConditions]);

	useEffect(() => {
		console.log(forecastWeatherCurrentHour);
	}, [forecastWeatherCurrentHour]);

	return (
		<div id='smooth-wrapper' className='container' ref={main}>
			<div id='smooth-content' ref={smoother} className='row'>
				{forecastWeatherToday !== {} &&
				currentWeather !== {} &&
				forecastWeatherCurrentHour !== {} ? (
					<div className='current-forecast mx-auto'>
						<div
							style={{
								display: 'inline',
								padding: '0rem 1rem 2rem 1rem',
								margin: '1rem',
							}}>
							<h5 className=''>{currentDate}</h5>
						</div>
						<div className='container' id='currentWeather' data-speed='0.5'>
							<div className='weather-text-boxes col-2 col-md-2'>
								<div className='weather-text-box-border'>
									<img
										className='large-icon'
										src={currentWeatherIcon}
										alt={currentWeather?.condition?.text}
									/>
									<p style={weatherTextStyle}>
										{precipObject?.precipString}
										<span className='current-weather-bold-text'>
											Chance of Precipitation:{' '}
										</span>
										{precipObject?.precipQuant}%
									</p>
									<p style={weatherTextStyle}>
										<span className='current-weather-bold-text'>
											Cloud Coverage:{' '}
										</span>
										{forecastWeatherCurrentHour?.cloud}%
									</p>
									<p style={weatherTextStyle}>
										<span className='current-weather-bold-text'>
											Conditions:{' '}
										</span>
										{currentWeather?.condition?.text}
									</p>
								</div>
							</div>

							<div className='weather-text-boxes col-2' data-speed='1'>
								<div className='weather-text-box-border'>
									<FaThermometerHalf className='py-2' size='32' />
									<p style={{ fontSize: '1rem', width: '75%',  }}>
										{currentWeather?.temp_f}°F
									</p>
									<p style={{ fontSize: '.85rem' }}>
										({forecastWeatherToday?.day?.maxtemp_f}°F/{' '}
										{forecastWeatherToday?.day?.mintemp_f}°F)
									</p>
									<p style={weatherTextStyle}>
										<span className='current-weather-bold-text'>
											Feels Like:{' '}
										</span>
										{currentWeather?.feelslike_f}
									</p>
									<p style={weatherTextStyle}>
										Humidity: {forecastWeatherCurrentHour?.humidity}%
									</p>
									<p style={weatherTextStyle}>
										Dew point:
										{forecastWeatherCurrentHour?.dewpoint_f}°F
									</p>
								</div>
							</div>

							<div className='weather-text-boxes col-2' data-speed='0.75'>
								<div className='weather-text-box-border'>
									<p style={weatherTextStyle}>
										<span className='current-weather-bold-text'>
											Heat index:{' '}
										</span>
										{forecastWeatherCurrentHour?.heatindex_f} °F
									</p>
									<p style={weatherTextStyle}>
										<span className='current-weather-bold-text'>
											Pressure:{' '}
										</span>
										{forecastWeatherCurrentHour?.pressure_mb} mb
									</p>
									<p style={weatherTextStyle}>
										<span className='current-weather-bold-text'>
											UV Index:{' '}
										</span>

										{forecastWeatherCurrentHour?.uv}
									</p>
									<p style={weatherTextStyle}>
										<span className='current-weather-bold-text'>
											Visibility:{' '}
										</span>
										{forecastWeatherCurrentHour?.vis_miles} mi
									</p>
								</div>
							</div>

							<div className='weather-text-boxes col-2' data-speed='0.5'>
								<div className='weather-text-box-border'>
									<FaWind className='py-2' size='32' />
									<p style={weatherTextStyle}>
										<span className='current-weather-bold-text'>Gust: </span>
										{forecastWeatherCurrentHour?.gust_mph} mph
									</p>
									<p style={weatherTextStyle}>
										<span className='current-weather-bold-text'>
											<VscCompass size='16' />{' '}
										</span>
										{forecastWeatherCurrentHour?.wind_dir}
									</p>
									<p style={weatherTextStyle}>
										<span className='current-weather-bold-text'>
											Wind Speed:{' '}
										</span>
										{forecastWeatherCurrentHour?.wind_mph} mph
									</p>
								</div>
							</div>
						</div>
						<div className='chart-container'>
							<div>
								<p className='m-auto'>Hourly Forecast</p>
							</div>
							<ConditionsChart
								data-speed='2'
								chartConditions={chartWeatherConditions}
							/>
						</div>
					</div>
				) : (
					<div>Enter a location in the search bar!</div>
				)}
			</div>
		</div>
	);
}

export default CurrentWeather;
