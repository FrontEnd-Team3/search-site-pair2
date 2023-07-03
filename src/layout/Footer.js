import styled from "styled-components";
import { flexCenter } from "styles/common";

const Footer = () => {
	return <FooterBox>@This is not Google, it is Gooooogle</FooterBox>;
};
export default Footer;

const FooterBox = styled.div`
	${flexCenter}
	width: 100%;
	height: 5vh;
	background: #f2f2f2;
`;
