import React, { useEffect, useState } from 'react';
import { Nav, Button, Form, Alert, Dropdown } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useWeatherContext } from '../../utils/GlobalState';
import {
	SET_WEATHER_LOCATION,
	SET_CURRENT_WEATHER,
	SET_FORECAST_WEATHER,
	WEATHER_LOCATION_LOADED,
} from '../../utils/actions';
import { getCurrentWeatherByCity } from '../../utils/axios';
import { FaSearch, FaBars } from 'react-icons/fa';

import '../../styles/style.css';

function Navbar() {
	const location = useLocation();
	const [state, dispatch] = useWeatherContext();
	const { weatherLocation } = state;
	const [showAlert, setShowAlert] = useState(false);
	const [activeTab, setActiveTab] = useState('/');
	const [userSearchInput, setUserSearchInput] = useState({
		userSearchInput: '',
	});

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setUserSearchInput({ ...userSearchInput, [name]: value });
	};

	const handleSearchInput = (event) => {
		event.preventDefault();
		if (userSearchInput && userSearchInput.userSearchInput !== '') {
			dispatch({
				type: SET_WEATHER_LOCATION,
				weatherLocation: userSearchInput.userSearchInput,
			});
			console.log(weatherLocation);
			dispatch({
				type: WEATHER_LOCATION_LOADED,
				weatherLocationLoaded: true,
			});
		} else {
			return;
		}
	};

	useEffect(() => {
		setActiveTab(location.pathname);
	}, [location]);

	return (
		<Nav id='mainNav' className='navbar navbar-light navbar-expand-md'>
			<div className='container'>
				<Link className='navbar-brand' to='/'>
					Weather Borealis
				</Link>
				<Button
					className='navbar-toggler navbar-toggler-right'
					data-bs-toggle='collapse'
					data-bs-target='#navbarResponsive'
					type='button'
					aria-controls='navbarResponsive'
					aria-expanded='false'
					aria-label='Toggle navigation'
					value='Menu'>
					<FaBars />
				</Button>
				<Form
					className='navbar-brand d-flex align-items-center'
					onSubmit={handleSearchInput}>
					<Alert
						dismissible
						onClose={() => setShowAlert(true)}
						show={showAlert}
						variant='danger'>
						You must enter a location before searching
					</Alert>
					<Form.Group>
						<Form.Control
							style={{ userSelect: 'all' }}
							type='text'
							size='sm'
							placeholder='city or zip'
							name='userSearchInput'
							onChange={handleInputChange}
							value={userSearchInput.userSearchInput}
						/>
						<Form.Control.Feedback type='invalid'>
							Location is required for search
						</Form.Control.Feedback>
					</Form.Group>
					<Button
						type='submit'
						className='search-button'
						variant='light'
						size='sm'>
						<FaSearch />
					</Button>
				</Form>
				<Dropdown
					flip={false}
					id='navbarResponsive'
					className='collapse navbar-collapse'
					style={{ transform: 'translate(-191)' }}>
					<section className='py-4 py-xl-5'></section>
					<i className='fas fa-search'></i>
					<ul className='navbar-nav ms-auto'>
						<li className='nav-item nav-link'>
							<Link
								className={`nav-link ${activeTab === '/' ? 'active' : ''}`}
								to='/'>
								Home
							</Link>
						</li>
						<li className='nav-item nav-link'>
							<Link
								className={`nav-link ${
									activeTab === '/aurora' ? 'active' : ''
								}`}
								to='/aurora'>
								Aurora Forecast
							</Link>
						</li>
						<li className='nav-item nav-link'>
							<Link
								className={`nav-link ${
									activeTab === '/contact' ? 'active' : ''
								}`}
								to='/contact'>
								Contact
							</Link>
						</li>
					</ul>
				</Dropdown>
			</div>
		</Nav>
	);
}

export default Navbar;
