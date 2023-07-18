import React, { useEffect } from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WeatherProvider } from './utils/GlobalState';

import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import Aurora from './Pages/Aurora';
import Contact from './Components/Contact';

import './App.css';
import './styles/bootstrap.min.css';
import './styles/style.css';

import ReactGA from 'react-ga';

function App() {
	useEffect(() => {
		ReactGA.pageview(window.location.pathname + window.location.search);
	}, []);
	return (
		<Router>
			<WeatherProvider>
				<Navbar />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/aurora' element={<Aurora />} />
					<Route path='/contact' element={<Contact />} />
				</Routes>
			</WeatherProvider>
		</Router>
	);
}

export default App;
