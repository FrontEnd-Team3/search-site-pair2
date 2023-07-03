import styled from "styled-components";

function SearchBtn({ onClick }) {
	return (
		<div>
			<SearchBtnn onClick={onClick}>검색</SearchBtnn>
		</div>
	);
}

export default SearchBtn;

const SearchBtnn = styled.button`
	width: 100px;
	padding: 6px 16px;
	border-radius: 0 10px 10px 0;
	background-color: #f8f9fa;
	border: 1px solid #dadce0;
	border-left: none;
	font-size: 18px;
	line-height: 24px;
	&:hover {
		cursor: pointer;
		background-color: blue;
		color: white;
	}
`;
