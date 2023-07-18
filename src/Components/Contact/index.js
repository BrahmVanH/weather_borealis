import React, { useEffect, useRef } from 'react';

import ContactCard from './contactInformation';
import ContactForm from './contactForm';

export default function Contact() {

	return (
		<div
			id='topOFPage'
			className='masthead'
			style={{
				backgroundImage: 'url(/assets/img/pink-grey-background-image.svg)',
				height: '100%',
				width: '100%',
			}}>
			<div
				id='topOfPage'
				className='contact-container d-flex justify-content-center row
			align-items-center'>
				<ContactForm />
				<ContactCard />
			</div>
		</div>
	);
}
