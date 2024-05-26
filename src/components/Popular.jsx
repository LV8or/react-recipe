import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
	max-width:1100px;
	padding:1.5rem;
	margin:0 auto 3rem;
`;

const Card = styled.div`
	border:2px solid #aaa;
	min-height: 20rem;
	border-radius:2rem;
	overflow: hidden;
	position: relative;

	img{
		border-radius:2rem;
		position: absolute;
		left: 0;
		width:100%;
		height:100%;
		object-fit: cover;
	}
	p{
		position: absolute;
		z-index: 10;
		left: 50%;
		bottom: 0%;
		transform: translate(-50%, 0%);
		color: #fff;
		width:100%;
		text-align: center;
		font-weight: 600;
		font-size: 1rem;
		height: 40%;
		display: flex;
		justify-content: center;
		slign-items: center;
	}
`;

const Gradient = styled.div`
	z-index: 3;
	position: absolute;
	width: 100%;
	height: 100%;
	background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5));
`;

export default function Popular() {

	const [popular, setPopular] = useState([]);

	const getPopular = async () => {
	const check = localStorage.getItem("popular");

		if(check) {
			setPopular(JSON.parse(check));
		}else{
			const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=yourkey&number=9`)
			const data = await api.json();
			
			localStorage.setItem("popular", JSON.stringify(data.recipes));
			setPopular(data.recipes);
		}    
	}

	useEffect(() => {
		getPopular();
	}, [])

	return (
		<Wrapper>
		
			<h3>Popular Picks</h3>

			<Splide options={{
				perPage: 4,
				arrows: true,
				pagination: false,
				drag: 'free',
				gap: '1rem'
			}}>
			{popular.map((recipe) => {
				return (
				<SplideSlide key={recipe.id}>
					<Card>
						<Link to={"/recipe/"+recipe.id}>
							<p>{recipe.title}</p>
							<img src={recipe.image} alt={recipe.title} />
							<Gradient/>
						</Link>
					</Card>
				</SplideSlide>
				)
			})}
			</Splide>

		</Wrapper>
	);
}
