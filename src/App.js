import Category from "components/Category";
import Search from "components/Search";
import Pages from "pages/Pages";
import { BrowserRouter, Link } from "react-router-dom";
import styled from "styled-components";
import { GiKnifeFork } from "react-icons/gi";

const Logo = styled(Link)`
	text-decoration: none;
	font-size: 1.5rem;
	font-weight: 400;
	font-family: 'Lobster' cursive;
`;

const Nav = styled.div`
	padding: 2rem 0rem;
	
	border-bottom:1px solid #ccc;
	.container {
		max-width:1100px;
		margin:0 auto;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	svg {
		font-size:2rem
	}
`;

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Nav>
					<div className="container">
						<GiKnifeFork />
						<Logo to={"/"}>Food!</Logo>
					</div>
				</Nav>
				<Search/>
				<Category/>
				<Pages/>
			</BrowserRouter>
		</div>
	);
}

export default App;
