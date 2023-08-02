import React from 'react';

export default function NoaaAlerts({ noaaAlerts }) {
	return (
		<div className='d-flex justify-content-center'>
			<div className='weather-text-boxes col-8 col-md-6 my-3'>
				<p>{noaaAlerts}</p>
			</div>
		</div>
	);
}
