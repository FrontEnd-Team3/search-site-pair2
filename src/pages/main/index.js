import RecentSearchesLi from "components/RecentSearchesLi";
import SearchBox from "components/SearchBox";
import SearchBtn from "components/SearchBtn";
import SearchResult from "components/SearchResult";
import useDebounce from "hooks/useDebounce";
import useRecentSearches from "hooks/useRecentSearches";
import useSearch from "hooks/useSearch";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { flexCenter } from "styles/common";
import ScrollListEventHandler from "hooks/scrollList";

const Main = () => {
	const [searchInputValue, setSearchInputValue] = useState("");
	const debouncedSearch = useDebounce(searchInputValue, 500);
	const { searchResults, searchState, setSearchResults } =
		useSearch(debouncedSearch);
	const { recentSearches, handleAddLocal } = useRecentSearches();
	const [selectedIndex, setSelectedIndex] = useState(null);

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

	const calculateSelected = () => {
		if (!searchState)
			return { idx: selectedIndex, arrayType: "recentSearches" };
		if (selectedIndex < searchResults.length)
			return { idx: selectedIndex, arrayType: "searchResults" };
		return {
			idx: selectedIndex - searchResults.length,
			arrayType: "recentSearches",
		};
	};

	useEffect(() => {
		let queries;
		if (!searchState) queries = recentSearches;
		else queries = [...searchResults, ...recentSearches];
		const eventHandler = ScrollListEventHandler(
			queries,
			selectedIndex,
			setSelectedIndex,
		);
		document.addEventListener("keydown", eventHandler);

		return () => {
			document.removeEventListener("keydown", eventHandler);
		};
	}, [selectedIndex]);

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
								calculateSelected={calculateSelected}
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
							calculateSelected={calculateSelected}
							data={recentSearches}
							onClick={() => setSearchInputValue}
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
	color: black;
	background-color: ${({ selected }) => (selected ? "#d9d9d9" : "transparent")};
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
