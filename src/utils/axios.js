import axios from 'axios';

export const getCurrentWeatherByCity = async (weatherLocation) => {
	const API_KEY = process.env.REACT_APP_WEATHERAPI_KEY;
	console.log(weatherLocation);
	const weatherApiUrl = 'https://api.weatherapi.com/v1';
	const forecastEndpoint = `/forecast.json?key=${API_KEY}&q=${weatherLocation}&days=6`;
	try {
		const response = await axios.get(`${weatherApiUrl}${forecastEndpoint}`);
		console.log(response.data);
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const getNoaaAlerts = async () => {
	
}

export const getSwsSolarWindData = async () => {
	const solarWindDay1Endpoint =
		'https://services.swpc.noaa.gov/products/solar-wind/mag-1-day.json';

	try {
		const response = await axios.get(solarWindDay1Endpoint)
			.then((response) => 
				response.data)
			.then((data) => {
				console.log(data);
			
				
			})
		console.log(response);
		return response;
	} catch (error) {
		console.error(error);
		throw error;
	}
};
