import React from 'react';

export default function NoaaAlerts({ noaaAlerts }) {
	const weatherTextStyle = {
		fontSize: '1rem',
		width: '90%',
	};

	return (
		<div className='d-flex justify-content-center'>
			<div className='noaa-alerts-container col-10'>
				<h5>NOAA Space Weather Alerts</h5>
				<p style={weatherTextStyle}>{noaaAlerts}</p>
			</div>
		</div>
	);
}
