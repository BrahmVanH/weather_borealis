import React, { createContext, useContext } from 'react';
import { useWeatherReducer } from './reducers';

const WeatherContext = createContext();
const { Provider } = WeatherContext;

const WeatherProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useWeatherReducer({
		currentDate: '',
		weatherLocation: '',
		weatherLocationLoaded: false,
    dataUnits: '',
		currentWeather: {},
		forecastWeatherCurrentHour: {},
		forecastWeatherToday: {},
		forecastWeather: [],
		currentWeatherIcon: '',
	});

  return <Provider value={[state, dispatch]} {...props} />;
};

const useWeatherContext = () => {
  return useContext(WeatherContext)
};

export { WeatherProvider, useWeatherContext };