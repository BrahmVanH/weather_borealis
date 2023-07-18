// import React, { useState } from 'react';

// import { FaWind, FaThermometerHalf } from 'react-icons/fa';

// function ForecastCard(forecastDay) {
// 	const [isShown, setIsShown] = useState(false);

// 	const weatherTextStyle = {
// 		fontSize: '.5em',
// 		width: '75%',
// 		borderBottom: 'solid white',
// 		borderBottomWidth: '1px',
// 	};

// 	return (
// 		<div
// 			onMouseEnter={() => setIsShown(true)}
// 			onMouseLeave={() => setIsShown(false)}
// 			className='weather-text-boxes box col-10 col-md-2'>
// 			<img
// 				className='medium-icon'
// 				src={forecastDay?.conditionIcon}
// 				alt={forecastDay?.conditionText}
// 			/>
// 			<FaThermometerHalf size='16' />
// 			<p style={weatherTextStyle}>{forecastDay?.avgTempF}°F</p>
// 			<FaWind size='16' />
// 			<p style={weatherTextStyle}>{forecastDay?.maxWindSpeedMph}mph</p>
//       <div  className={`${isShown ?  : 'hidden'}`}>
// 			<h1>LOT OF INFORMATION TO MAKE THE DIV EXTEND</h1>

//       </div>
// 		</div>
// 	);
// }

// export default ForecastCard;
