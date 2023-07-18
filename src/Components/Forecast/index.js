import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import ConditionsChart from '../ConditionsChart';
import { useWeatherContext } from '../../utils/GlobalState';
import { FaWind, FaThermometerHalf } from 'react-icons/fa';
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

function Forecast(forecastWeather) {
	console.log(forecastWeather.forecastWeather);

	const [precipObject, setPrecipObject] = useState({});
	const [dayOneForecast, setDayOneForecast] = useState({});
	const [dayTwoForecast, setDayTwoForecast] = useState({});
	const [dayThreeForecast, setDayThreeForecast] = useState({});
	const [isShownOne, setIsShownOne] = useState(false);
	const [isShownTwo, setIsShownTwo] = useState(false);
	const [isShownThree, setIsShownThree] = useState(false);
	const [forecastWeatherArray, setForecastweatherArray] = useState([]);

	const weatherTextStyle = {
		width: '75%',
		fontSize: '1rem',
	
	};

	const averageWindSpeedValues = (windObject) => {
		const { maxWindSpeed, minWindSpeed } = windObject;
		let averageWindSpeed = 0;
		if (maxWindSpeed > 0 && minWindSpeed > 0) {
			averageWindSpeed = (maxWindSpeed + minWindSpeed) / 2;
		} else if (maxWindSpeed === 0 || minWindSpeed === 0) {
			averageWindSpeed = (maxWindSpeed + minWindSpeed) / 2;
		} else if (maxWindSpeed === 0 && minWindSpeed === 0) {
			averageWindSpeed = 0;
		} else {
			averageWindSpeed = null;
			console.log(windObject);
			console.log(
				'There was an error in calculating the average wind speed for the day'
			);
		}

		return averageWindSpeed;
	};

	useEffect(() => {
		console.log(forecastWeather?.forecastWeather);
		const weatherForecast = forecastWeather?.forecastWeather;
		let forecastArray = [];
		weatherForecast?.map((forecastDay) => {
			forecastArray.push(forecastDay);
		});

		setForecastweatherArray(forecastArray);
	}, [forecastWeather]);

	useEffect(() => {
		console.log(forecastWeatherArray);
	}, [forecastWeatherArray]);

	useEffect(() => {
		console.log(forecastWeatherArray[0]);
		setDayOneForecast({
			conditionIcon: forecastWeatherArray[0]?.day?.condition.icon,
			conditionText: forecastWeatherArray[0]?.day?.condition.text,
			avgTempF: forecastWeatherArray[0]?.day?.avgtemp_f,
			maxTempF: forecastWeatherArray[0]?.day?.maxtemp_f,
			minTempF: forecastWeatherArray[0]?.day?.mintemp_f,
			avgHumidity: forecastWeatherArray[0]?.day?.avghumidity,
			totalPrecipIn: forecastWeatherArray[0]?.day?.totalprecip_in,
			totalSnowIn: forecastWeatherArray[0]?.day?.totalsnow_cm,
			maxWindSpeedMph: forecastWeatherArray[0]?.day?.maxwind_mph,
			uvIndex: forecastWeatherArray[0]?.day?.uv,
		});
		setDayTwoForecast({
			conditionIcon: forecastWeatherArray[1]?.day?.condition.icon,
			conditionText: forecastWeatherArray[1]?.day?.condition.text,
			avgTempF: forecastWeatherArray[1]?.day?.avgtemp_f,
			maxTempF: forecastWeatherArray[1]?.day?.maxtemp_f,
			minTempF: forecastWeatherArray[1]?.day?.mintemp_f,
			avgHumidity: forecastWeatherArray[1]?.day?.avghumidity,
			totalPrecipIn: forecastWeatherArray[1]?.day?.totalprecip_in,
			totalSnowIn: forecastWeatherArray[1]?.day?.totalsnow_cm,
			maxWindSpeedMph: forecastWeatherArray[1]?.day?.maxwind_mph,
			uvIndex: forecastWeatherArray[1]?.day?.uv,
		});
		setDayThreeForecast({
			conditionIcon: forecastWeatherArray[2]?.day?.condition.icon,
			conditionText: forecastWeatherArray[2]?.day?.condition.text,
			avgTempF: forecastWeatherArray[2]?.day?.avgtemp_f,
			maxTempF: forecastWeatherArray[2]?.day?.maxtemp_f,
			minTempF: forecastWeatherArray[2]?.day?.mintemp_f,
			avgHumidity: forecastWeatherArray[2]?.day?.avghumidity,
			totalPrecipIn: forecastWeatherArray[2]?.day?.totalprecip_in,
			totalSnowIn: forecastWeatherArray[2]?.day?.totalsnow_cm,
			maxWindSpeedMph: forecastWeatherArray[2]?.day?.maxwind_mph,
			uvIndex: forecastWeatherArray[2]?.day?.uv,
		});
	}, [forecastWeatherArray]);

	useEffect(() => {
		console.log(forecastWeather);
	}, [forecastWeather]);

	return (
		<div className='container d-flex justify-content-around row'>
			<div
				onMouseEnter={() => setIsShownOne(true)}
				onMouseLeave={() => setIsShownOne(false)}
				className='weather-text-boxes box col-10 col-md-2'>
				<div className='weather-text-box-border'>
					<img
						className='medium-icon'
						src={dayOneForecast?.conditionIcon}
						alt={dayOneForecast?.conditionText}
					/>
					<FaThermometerHalf size='16' />
					<p style={weatherTextStyle}><span className='current-weather-bold-text'>
						Temperature: </span>{dayOneForecast?.avgTempF}°F</p>
					<FaWind size='16' />
					<p style={weatherTextStyle}>{dayOneForecast?.maxWindSpeedMph}mph</p>
				</div>
			</div>
			<div
				onMouseEnter={() => setIsShownTwo(true)}
				onMouseLeave={() => setIsShownTwo(false)}
				className='weather-text-boxes box col-10 col-md-2'>
				<div className='weather-text-box-border'>

				<img
					className='medium-icon'
					src={dayTwoForecast?.conditionIcon}
					alt={dayTwoForecast?.conditionText}
				/>
				<FaThermometerHalf size='16' />
				<p style={weatherTextStyle}>{dayTwoForecast?.avgTempF}°F</p>
				<FaWind size='16' />
				<p style={weatherTextStyle}>{dayTwoForecast?.maxWindSpeedMph}mph</p>
			</div>
			</div>
			<div
				onMouseEnter={() => setIsShownThree(true)}
				onMouseLeave={() => setIsShownThree(false)}
				className='weather-text-boxes box col-10 col-md-2'>
				<div className='weather-text-box-border'>

				<img
					className='medium-icon'
					src={dayThreeForecast?.conditionIcon}
					alt={dayThreeForecast?.conditionText}
				/>
				<FaThermometerHalf size='16' />
				<p style={weatherTextStyle}>{dayThreeForecast?.avgTempF}°F</p>
				<FaWind size='16' />
				<p style={weatherTextStyle}>{dayThreeForecast?.maxWindSpeedMph}mph</p>

				<div className={`${isShownThree ? {} : 'hidden'}`}>
					Lots of other information
				</div>
				</div>
			</div>
		</div>
	);
}

export default Forecast;
