import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

const DetailWrapper = styled.div`
	margin-top: 10rem;
	margin-bottom: 5rem;
	display: flex;
	.active {
		background: linear-gradient(35deg, #494949, #313131);
		color: #fff;
	}
	h2 {
		margin-bottom: 2rem;
	}
	li {
		font-size: 1rem;
		line-height: 1.5rem;
	}
	ul {
		margin-top: 2rem;
	}
`;

const Button = styled.button`
	padding: 1rem 2rem;
	color: #313131;
	background: #fff;
	border: 2px solid black;
	margin-right: 2rem;
	margin-bottom: 2rem;
	font-weight: 600;
`;

const Info = styled.div`
	margin-left: 10rem;
`

const InfoSect = styled.div`
	margin-bottom: 2rem;
`

export default function Recipe() {
	let params = useParams();
	const [details, setDetails] = useState({});
	const [activeTab, setActiveTab] = useState('instructions');

	const fetchDetails = async (name) => {
		const data = await fetch(`https://api.spoonacular.com/recipes/${name}/information?apiKey=yourkey`);
		const detailData = await data.json();
		setDetails(detailData);
	}

	useEffect(() => {
		fetchDetails(params.name);
	}, [params.name])

	return (
		<DetailWrapper>
			<div>
				<h2>{details.title}</h2>
				<img src={details.image} alt={details.image} />
			</div>
			<Info>
				<Button
					className={activeTab === 'instructions' ? 'active' : ''}
					onClick={() => setActiveTab("instructions")}
				>
					Instructions
				</Button>
				<Button
					className={activeTab === 'ingredients' ? 'active' : ''}
					onClick={() => setActiveTab("ingredients")}
				>
					Ingredients
				</Button>
				{activeTab === "instructions" && (
					<div>
						<InfoSect dangerouslySetInnerHTML={{ __html: details.summary }}></InfoSect>
						<InfoSect dangerouslySetInnerHTML={{ __html: details.instructions }}></InfoSect>
					</div>
				)}
				{activeTab === "ingredients" && (
					<ul>
						{details.extendedIngredients.map((ingredient) => (
							<li key={ingredient.id}>{ingredient.original}</li>
						))}
					</ul>
				)}
			</Info>
		</DetailWrapper>
	)
}
