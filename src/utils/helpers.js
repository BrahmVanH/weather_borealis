export const getBrowserLocation = async () => {
	console.log('getting browser location...');
	let formattedBrowserLocation = '';
	const coordinates = await navigator.geolocation.getCurrentPosition(
		(position) => {
			const { latitude, longitude } = position.coords;
			console.log(`browser location: ${latitude},${longitude}`);
			return { latitude, longitude };
		}
		
	);
	const { latitude, longitude } = coordinates;
	formattedBrowserLocation = formatBrowserLocation(latitude, longitude);
		console.log(formattedBrowserLocation);
	return formattedBrowserLocation;
};

export const formatBrowserLocation = async (browserLatitude, browserLongitude) => {
	if (
		browserLatitude.toString().slice(0, 1) === '-' ||
		browserLatitude.toString().slice(0, 1) === '+'
	) {
		var reducedDecimalLatitude = browserLatitude.toString().slice(0, 8);
	} else {
		var reducedDecimalLatitude = browserLatitude.toString().slice(0, 7);
	}

	if (
		browserLongitude.toString().slice(0, 1) === '-' ||
		browserLongitude.toString().slice(0, 1) === '+'
	) {
		var reducedDecimalLongitude = browserLongitude.toString().slice(0, 8);
	} else {
		var reducedDecimalLongitude = browserLongitude.toString().slice(0, 7);
	}
	const browserLatitudeLongitude = `${reducedDecimalLatitude},${reducedDecimalLongitude}`;

	console.log(`formatted browser location: ${browserLatitudeLongitude}`);

	return browserLatitudeLongitude;
};

export const formatHour = (hour) => {
	let hourFormatted = '';
	let meridiemString = '';
	if (hour === 0) {
		hourFormatted = '12';
		meridiemString = 'am';
	} else if (hour < 10) {
		const hourString = hour.toString();
		hourFormatted = hourString.slice(1, 2);
		meridiemString = 'am';
	} else if (hour == 10 || hour == 11) {
		hourFormatted = hour.toString();
		meridiemString = 'am';
	} else if (hour == 12) {
		hourFormatted = hour.toString();
		meridiemString = 'pm';
	} else if (hour > 12) {
		hourFormatted = hour - 12;
		meridiemString = 'pm';
	}
	return { hourFormatted, meridiemString };
};

export const packagePrecipInfo = (forecastWeatherCurrentHour) => {
	let chanceRain = forecastWeatherCurrentHour?.chance_of_rain;
	let chanceSnow = forecastWeatherCurrentHour?.chance_of_snow;
	let willRain = forecastWeatherCurrentHour?.will_it_rain;
	let willSnow = forecastWeatherCurrentHour?.will_it_snow;

	const precipInfo = { chanceRain, chanceSnow, willRain, willSnow };
	return precipInfo;
};

export const createPrecipObject = (precipInfo) => {
	const { chanceRain, chanceSnow, willRain, willSnow } = precipInfo;
	let precipString = '';
	let precipQuant = 0;
	let precipObject = {};

	if (willRain === 1 && willRain !== 0 && willSnow === 0 && willSnow !== 1) {
		precipString = 'Expect rain';
		precipQuant = chanceRain;
		precipObject = { precipString, precipQuant };
	} else if (
		willRain === 1 &&
		willRain !== 0 &&
		willSnow === 1 &&
		willSnow !== 0
	) {
		precipString = 'Expect snow';
		precipQuant = (chanceRain + chanceSnow) / 2;
		precipObject = { precipString, precipQuant };
	} else if (
		willRain === 0 &&
		willRain !== 1 &&
		willSnow === 0 &&
		willSnow !== 1
	) {
		precipString = '';
		precipQuant = 0;
		precipObject = { precipString, precipQuant };
	} else if (
		willRain === 0 &&
		willRain !== 1 &&
		willSnow === 1 &&
		willSnow !== 0
	) {
		precipString = 'Expect snow';
		precipQuant = chanceSnow;
		precipObject = { precipString, precipQuant };
	}

	return precipObject;
};
