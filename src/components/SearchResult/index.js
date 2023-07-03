import styled from "styled-components";

function SearchResult({ data, onClick }) {
	return (
		<SearchResultsUl>
			<ResultTextBox>
				<p>자동 검색어</p>
			</ResultTextBox>
			{data.map((item, index) => (
				<SearchResultLi
					key={index}
					onClick={() => onClick(index)}
					selected={
						calculateSelected().arrayType === "recentSearches" &&
						calculateSelected().idx === idx
					}
				>
					{item}
				</SearchResultLi>
			))}
		</SearchResultsUl>
	);
}

export default SearchResult;

const ResultTextBox = styled.div`
	color: blue;
	padding-bottom: 20px;
`;

const SearchResultsUl = styled.ul`
	width: 57%;
	padding: 20px 20px 0px 20px;
	background-color: white;
	border: 1px solid #dadce0;
	border-radius: 12px;
`;

const SearchResultLi = styled.li`
	cursor: pointer;
	margin-bottom: 10px;
	font-size: 16px;
	line-height: 22px;
	color: black;
	background-color: ${({ isFocused }) => (isFocused ? "#e9e9e9" : "none")};
	&:hover {
		background-color: #e9e9e9;
	}
`;
