const noaaAlertsJson = 'https://services.swpc.noaa.gov/products/alerts.json';
const solarWind1HourJson = 'https://services.swpc.noaa.gov/products/geospace/propagated-solar-wind-1-hour.json';
const xraySolarFlares6HourJson = 'https://services.swpc.noaa.gov/json/goes/primary/xrays-6-hour.json';
const xraySolarFlare24HourJson = 'https://services.swpc.noaa.gov/json/goes/primary/xrays-1-day.json';
const sunspotReportJson = 'https://services.swpc.noaa.gov/json/sunspot_report.json';
const radioFluxJson = 'https://services.swpc.noaa.gov/json/f107_cm_flux.json';
const radioFluxPredictionJson = 'https://services.swpc.noaa.gov/products/solar-cycle-25-f10-7-predicted-range.json';
const planetaryKpIndexJson = 'https://services.swpc.noaa.gov/json/planetary_k_index_1m.json';


export const fetchNoaaAlerts = async () => {
  const response = await fetch(noaaAlertsJson);
	if (!response.ok) throw new Error(response.statusText);
	return response.json();
}


export const fetchPlanetaryKpIndex = async () => {
  const response = await fetch(planetaryKpIndexJson);
  if (!response.ok) throw new Error(response.statusText);
	return response.json();
}


export const fetchSolarWind1Hour = async () => {
  console.log("fetching solar wind data...")
  const response = await fetch(solarWind1HourJson);
	if (!response.ok) throw new Error(response.statusText);
	return response.json();
}

export const fetchXrayFlare6Hour = async () => {
  const response = await fetch(xraySolarFlares6HourJson);
	if (!response.ok) throw new Error(response.statusText);
	return response.json();
}

export const fetchXrayFlare24Hour = async () => {
  const response = await fetch(xraySolarFlare24HourJson);
	if (!response.ok) throw new Error(response.statusText);
	return response.json();
}

export const fetchSunspotReport = async () => {
  const response = await fetch(sunspotReportJson);
	if (!response.ok) throw new Error(response.statusText);
	return response.json();
}

export const fetchSolarRadioFlux = async () => {
  const response = await fetch(radioFluxJson);
	if (!response.ok) throw new Error(response.statusText);
	return response.json();
}

export const fetchSolarRadioFluxPrediction = async () => {
  const response = await fetch(radioFluxPredictionJson);
	if (!response.ok) throw new Error(response.statusText);
	return response.json();
}
