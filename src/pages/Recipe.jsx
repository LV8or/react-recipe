import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

const DetailWrapper = styled.div`
	max-width:1100px;
	padding:3rem 1rem 0rem;
	margin: 0 auto 3rem;
	display: flex;
	flex-wrap: wrap;
	gap: 1.5rem;

	.active {
		background: linear-gradient(35deg, #494949, #313131);
		color: #fff;
	}
	h2 {
		margin-bottom: 1.5rem;
	}
	img {max-width:100%;}
	li {
		font-size: 1rem;
		line-height: 1.5rem;
		margin-bottom:0.5rem
	}
	ul, ol {
		margin:0;
		margin-top: 1.5rem;
		list-style-position: inside; 
	}
`;

const Button = styled.button`
	padding: 1rem 2rem;
	color: #313131;
	background: #fff;
	border: 2px solid black;
	margin-right: 2rem;
	margin-bottom: 1.5rem;
	font-weight: 600;
`;

const Info = styled.div`
	margin-left: 0rem;
`

const InfoSect = styled.div`
	margin-bottom: 0rem;
	line-height:1.55rem;
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
