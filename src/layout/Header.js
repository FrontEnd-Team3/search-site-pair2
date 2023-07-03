import styled from "styled-components";
import { flexCenter } from "styles/common";

const Header = () => {
	return (
		<MainTextBox>
			<MainH1>Gooooogle</MainH1>
		</MainTextBox>
	);
};
export default Header;

const MainTextBox = styled.div`
	${flexCenter}
	width: 100%;
	height: 20vh;
	background: #f2f2f2;
`;

const MainH1 = styled.h1`
	font-size: 70px;
	font-weight: 800;
	color: #111;
`;
