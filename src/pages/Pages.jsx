import Home from './Home';
import { Route, Routes, useLocation } from "react-router-dom"
import Cuisine from './Cuisine';
import Searched from './Searched';
import Recipe from './Recipe';
import ScrollToTop from 'components/ScrollToTop/scroll-to-top';
import { AnimatePresence } from 'framer-motion';

export default function Pages() {
	const location = useLocation();
	return (
		<AnimatePresence mode='wait'>
			<Routes location={location} key={location.pathname}>
				<Route path="/" element={<Home/>} />
				<Route path="/cuisine/:type" element={<Cuisine/>} />
				<Route path="/searched/:search" element={<Searched/>} />
				<Route path="/recipe/:name" element={<Recipe/>} />
			</Routes>
		<ScrollToTop />
		</AnimatePresence>
	)
}
