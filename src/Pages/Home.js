import React, { useEffect, useState, useLayoutEffect, useRef } from 'react';

import {
	SET_CURRENT_DATE,
	SET_WEATHER_LOCATION,
	SET_UNITS,
	SET_CURRENT_WEATHER,
	SET_FORECAST_WEATHER,
	SET_FORECAST_TODAY,
	SET_CURRENT_WEATHER_ICON,
	SET_FORECAST_CURRENT_HOUR,
} from '../utils/actions';

import { useWeatherContext } from '../utils/GlobalState';

import { formatBrowserLocation } from '../utils/helpers';
import { getBrowserLocation } from '../utils/helpers';
import { getCurrentWeatherByCity } from '../utils/axios';
import { formatDate } from '../utils/dateFormat';

import CurrentWeather from '../Components/CurrentWeather';
import Forecast from '../Components/Forecast';

import auroraBurned from '../assets/img/auroraBurned.png';

function Home() {
	const componentDidMount = () => {
		if ('geolocation' in navigator) {
			console.log('available');
		} else {
			console.log('unavailable');
		}
	};

	useEffect(() => {
		componentDidMount();
	}, []);

	const [state, dispatch] = useWeatherContext();

	const {
		currentDate,
		weatherLocation,
		weatherLocationLoaded,
		dataUnits,
		currentWeather,
		currentWeatherIcon,
		forecastWeatherCurrentHour,
		forecastWeatherToday,
	} = state;

	const [forecastWeather, setForecastWeather] = useState([]);

	// const [browserLocation, setBrowserLocation] = useState({
	// 	browserLocation: '',
	// });

	// const [browserLocationLoaded, setBrowserLocationLoaded] = useState(false);

	const todayDate = new Date().toString();
	const formattedDate = formatDate(todayDate);

	const fetchWeatherData = async () => {
		console.log('Fetching weather data');
		try {
			const weatherData = await getCurrentWeatherByCity(weatherLocation);
			console.log(weatherData);
			if (!weatherData) {
				console.log('No weather data returned for that location string');
			} else if (weatherData !== '') {
				dispatch({
					type: SET_CURRENT_WEATHER,
					currentWeather: weatherData?.current,
				});
				dispatch({
					type: SET_FORECAST_TODAY,
					forecastWeatherToday: weatherData?.forecast.forecastday[0],
				});
				dispatch({
					type: SET_FORECAST_CURRENT_HOUR,
					forecastWeatherCurrentHour:
						weatherData?.forecast.forecastday[0].hour[0],
				});
				dispatch({
					type: SET_CURRENT_WEATHER_ICON,
					currentWeatherIcon: weatherData?.current.condition.icon,
				});
				setForecastWeather(weatherData?.forecast.forecastday);
				console.log(weatherData);
			}
		} catch (err) {
			console.error(err);
			console.log(
				'Something went wrong in the try catch fetchWeatherData function'
			);
		}
	};

	// const fetchWeatherDataViaBrowser = async (browserLocation) => {
	// 	console.log('Fetching weather data');
	// 	try {
	// 		const weatherData = await getCurrentWeatherByCity(browserLocation);
	// 		console.log(browserLocation);
	// 		if (!weatherData) {
	// 			console.log('No weather data returned for that location string');
	// 		} else if (weatherData !== '') {
	// 			dispatch({
	// 				type: SET_CURRENT_WEATHER,
	// 				currentWeather: weatherData?.current,
	// 			});
	// 			dispatch({
	// 				type: SET_FORECAST_TODAY,
	// 				forecastWeatherToday: weatherData?.forecast.forecastday[0],
	// 			});
	// 			dispatch({
	// 				type: SET_FORECAST_CURRENT_HOUR,
	// 				forecastWeatherCurrentHour:
	// 					weatherData?.forecast.forecastday[0].hour[0],
	// 			});
	// 			dispatch({
	// 				type: SET_CURRENT_WEATHER_ICON,
	// 				currentWeatherIcon: weatherData?.current.condition.icon,
	// 			});
	// 			setForecastWeather(weatherData?.forecast.forecastday);
	// 			console.log(weatherData);
	// 		}
	// 	} catch (err) {
	// 		console.error(err);
	// 		console.log(
	// 			'Something went wrong in the try catch fetchWeatherData function'
	// 		);
	// 	}
	// };

	useEffect(() => {
		dispatch({
			type: SET_CURRENT_DATE,
			currentDate: formattedDate,
		});
		console.log(currentDate);
	}, [formattedDate]);

	// useEffect(() => {
	// 	console.log('fetching browser location...')
	// 	const fetchBLocationWeather = async () => {
	// 		const browserLocation = await getBrowserLocation();
	// 		console.log(browserLocation);
	// 		return browserLocation;
	// 	}
	// 	const browserLocation = fetchBLocationWeather()
	// 		.catch(console.error);
	// 	if (browserLocation !== '') {
	// 		setBrowserLocation(browserLocation);
	// 	} else {
	// 		console.log('still waiting for browser location to set');
	// 	}
	// }, []);

	useEffect(() => {
		if (weatherLocation !== '' && weatherLocationLoaded === true) {
			fetchWeatherData();
			console.log(weatherLocation);
		} else {
		}
	}, [weatherLocation, weatherLocationLoaded]);

	// useEffect(() => {
	// 	if (browserLocation !== '') {
	// 		console.log(browserLocation);
	// 		dispatch({
	// 			type: SET_WEATHER_LOCATION,
	// 			weatherLocation: browserLocation,
	// 		});
	// 	}
	// }, [browserLocation]);

	return (
		<>
			<div
				className='masthead'
				id='topOfPage'
				style={{
					backgroundImage: `url(${auroraBurned})`,
				}}>
				{currentWeather ? (
					<div className='weather-response d-flex flex-column'>
						<div className='intro-body'>
							<div className='container'>
								<div className='row' style={{ padding: '2rem' }}>
									<div
										className='mx-auto'
										style={{ padding: '1rem 1rem 1rem 0rem' }}>
										<h3>Current Weather</h3>
										<CurrentWeather />
									</div>
								</div>
							</div>
						</div>
						<section className='text-center' id='extended'>
							<div className='container'>
								{forecastWeather !== [] ? (
									<div
										className='mx-auto'
										style={{ padding: '1rem', margin: '1rem' }}>
										<h3>3-Day Forecast</h3>

										<div className='d-flex flex-wrap' id='tenDayForecast'>
											<Forecast forecastWeather={forecastWeather} />
										</div>
									</div>
								) : (
									<></>
								)}
							</div>
						</section>
					</div>
				) : (
					<div
						className='d-flex justify-content-center py-5'
						style={{ width: '100%' }}>
						<div
							className='col-6 please-search'
							style={{ padding: '2rem', fontSize: '1.5rem' }}>
							{' '}
							Please enter a location in the search bar{' '}
						</div>
					</div>
				)}
			</div>
		</>
	);
}

export default Home;
