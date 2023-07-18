import { useReducer } from 'react';
import {
	SET_WEATHER_LOCATION,
	SET_UNITS,
	SET_CURRENT_WEATHER,
	UPDATE_RECENT_SEARCHES,
	CLEAR_RECENT_SEARCHES,
	SET_FORECAST_WEATHER,
	SET_CURRENT_DATE,
	WEATHER_LOCATION_LOADED,
	SET_FORECAST_TODAY,
	SET_CURRENT_WEATHER_ICON,
	SET_FORECAST_CURRENT_HOUR,
} from './actions';

export const reducer = (state, action) => {
	switch (action.type) {
		case SET_CURRENT_DATE:
			return {
				state,
				currentDate: action.currentDate,
			};
		case SET_WEATHER_LOCATION:
			return {
				...state,
				weatherLocation: action.weatherLocation,
			};
		case WEATHER_LOCATION_LOADED:
			return {
				...state,
				weatherLocationLoaded: action.weatherLocationLoaded,
			};
		case SET_UNITS:
			return {
				...state,
				units: action.units,
			};
		case SET_CURRENT_WEATHER:
			return {
				...state,
				currentWeather: action.currentWeather,
			};
		case SET_FORECAST_CURRENT_HOUR:
			return {
				...state,
				forecastWeatherCurrentHour: action.forecastWeatherCurrentHour,
			};
		case SET_CURRENT_WEATHER_ICON:
			return {
				...state,
				currentWeatherIcon: action.currentWeatherIcon,
			};
		case SET_FORECAST_WEATHER:
			return {
				...state,
				forecastWeather: action.forecastWeather,
			};
		case SET_FORECAST_TODAY:
			return {
				...state,
				forecastWeatherToday: action.forecastWeatherToday,
			};
		case UPDATE_RECENT_SEARCHES:
			return {
				...state,
				recentSearches: [...action.recentSearches],
			};
		case CLEAR_RECENT_SEARCHES:
			return {
				...state,
				recentSearches: [...action.recentSearches],
			};

		default:
			return state;
	}
};

export function useWeatherReducer(initialState) {
	return useReducer(reducer, initialState);
}
