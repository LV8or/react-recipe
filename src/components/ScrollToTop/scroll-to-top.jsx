// BackToTopButton.js
import { useState, useEffect } from 'react';
import { IoIosArrowUp } from "react-icons/io";
import './styles.css';

export default function ScrollToTop() {
	const [isVisible, setIsVisible] = useState(false);

	const toggleVisibility = () => {
		let vis = (window.pageYOffset > 300) ? true : false;
		setIsVisible(vis);
	};

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	useEffect(() => {
		window.addEventListener('scroll', toggleVisibility);
		return () => {
			window.removeEventListener('scroll', toggleVisibility);
		};
	}, []);

	return (
		<div className="back-to-top">
		{isVisible && (
			<button onClick={scrollToTop} className="back-to-top-button">
				<IoIosArrowUp />
			</button>
		)}
		</div>
	);
};