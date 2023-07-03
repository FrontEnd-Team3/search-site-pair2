import RecentSearchesLi from "components/RecentSearchesLi";
import SearchBox from "components/SearchBox";
import SearchBtn from "components/SearchBtn";
import SearchResult from "components/SearchResult";
import useDebounce from "hooks/useDebounce";
import useRecentSearches from "hooks/useRecentSearches";
import useSearch from "hooks/useSearch";
import { useState } from "react";
import styled from "styled-components";
import { flexCenter } from "styles/common";

const Main = () => {
	const [searchInputValue, setSearchInputValue] = useState("");
	const debouncedSearch = useDebounce(searchInputValue, 500);
	const { searchResults, searchState, setSearchResults } =
		useSearch(debouncedSearch);
	const { recentSearches, handleAddLocal } = useRecentSearches();

	const handleSearchResultClick = index => {
		const searchResult = searchResults[index];
		setSearchInputValue(searchResult);
	};

	const handleKeyPress = event => {
		if (event.key === "Enter") {
			// Enter키를 눌렀을 때
			handleAddLocal(debouncedSearch);
		}
	};

	return (
		<>
			<MainContainer>
				<MainSearchBox>
					<SearchBox
						value={searchInputValue}
						onChange={e => setSearchInputValue(e.target.value)}
						onKeyPress={handleKeyPress}
					/>
					<SearchBtn onClick={() => handleAddLocal(debouncedSearch)} />
				</MainSearchBox>
				<ResultBox>
					{searchState && searchResults.length > 0 && (
						<>
							<SearchResult
								data={searchResults}
								onClick={handleSearchResultClick}
							/>
						</>
					)}
				</ResultBox>
				{recentSearches && recentSearches.length > 0 && (
					<RecentBox>
						<RecentTextBox>
							<p>최근 검색어</p>
						</RecentTextBox>

						<RecentSearchesLi
							data={recentSearches}
							onClick={idx => setSearchInputValue(recentSearches[idx])}
						/>
					</RecentBox>
				)}
			</MainContainer>
		</>
	);
};

export default Main;

const MainContainer = styled.div`
	padding: 20px;
`;

const MainSearchBox = styled.div`
	${flexCenter}
	width: 100%;
	margin-bottom: 20px;
	display: flex;
	flex-direction: row;
`;

const ResultBox = styled.div`
	${flexCenter}
	width: 800px
	margin-bottom: 20px;
	display: flex;
	flex-direction: column;
`;

const RecentBox = styled.div`
	width: 57%;
	padding: 20px 20px 10px 20px;
	background-color: white;
	border: 1px solid #dadce0;
	border-radius: 12px;
	list-style: none;
	margin: 0 auto;
`;

const RecentTextBox = styled.div`
	padding-bottom: 20px;
	color: blue;
`;
