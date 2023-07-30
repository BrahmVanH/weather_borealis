const noaaAlertsJson = 'https://services.swpc.noaa.gov/products/alerts.json';
const solarWind1HourJson = 'https://services.swpc.noaa.gov/products/geospace/propagated-solar-wind-1-hour.json';
const xraySolarFlares6HourJson = 'https://services.swpc.noaa.gov/json/goes/primary/xrays-6-hour.json';
const xraySolarFlare24HourJson = 'https://services.swpc.noaa.gov/json/goes/primary/xrays-1-day.json';
const sunSpotReportJson = 'https://services.swpc.noaa.gov/json/sunspot_report.json';
const cmFluxJson = 'https://services.swpc.noaa.gov/json/f107_cm_flux.json';
const cmFluxPredictionJson = 'https://services.swpc.noaa.gov/products/solar-cycle-25-f10-7-predicted-range.json';
const planetaryKIndexJson = 'https://services.swpc.noaa.gov/json/planetary_k_index_1m.json';

export const fetchNoaaAlerts = async () => {
	try {
		fetch(noaaAlertsJson)
			.then((response) => {
				if (response.ok) {
					return response.json();
				}
			})
			.then((data) => {
				console.log(`NOAA Alterts: ${data}`);
			})
			.catch((error) => {
				console.log('Error fetching NOAA space weather alerts');
			});
	} catch (error) {
		console.error(error);
		throw new error();
	}
};

export const fetchSolarWind1Hour = async () => {
	try {
		fetch(solarWind1HourJson)
			.then((response) => {
				if (response.ok) {
					return response.json();
				}
			})
			.then((data) => {
				console.log(`1-Hour Solar Wind Data: ${data}`);
			})
			.catch((error) => {
				console.log('Error fetching solar wind data...');
			});
	} catch (error) {
		console.error(error);
		throw new error();
	}
};
