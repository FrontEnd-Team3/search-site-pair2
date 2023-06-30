import { axiosInstance } from "apis/@core";
import useDebounce from "hooks/useDebounce";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { flexCenter } from "styles/common";

const Main = () => {
	const [searchInputValue, setSearchInputValue] = useState("");
	const [searchState, setSearchState] = useState(false);
	const debouncedSearch = useDebounce(searchInputValue, 500);
	const [searchResults, setSearchResults] = useState([]);
	const [recentSearches, setRecentSearches] = useState([]);

	useEffect(() => {
		const recentSearches =
			JSON.parse(localStorage.getItem("recentSearches")) || [];
		setRecentSearches(recentSearches);
	}, []);

	// API 호출 함수
	const getSearchInfos = async searchInputValue => {
		try {
			const { data } = await axiosInstance.get("?key=" + searchInputValue);
			setSearchResults(data);
			console.log(searchResults);
			setSearchState(true);
		} catch (err) {
			console.log("err");
		}
	};

	useEffect(() => {
		if (debouncedSearch) {
			getSearchInfos(debouncedSearch);
		} else {
			setSearchState(false);
		}
	}, [debouncedSearch]);

	const handleAddLocal = () => {
		const newRecentSearches = recentSearches.filter(
			search => search !== debouncedSearch,
		);
		newRecentSearches.unshift(debouncedSearch);
		const recentSearchesLimited = newRecentSearches.slice(0, 5);
		setRecentSearches(recentSearchesLimited);
		localStorage.setItem(
			"recentSearches",
			JSON.stringify(recentSearchesLimited),
		);
	};

	return (
		<>
			<MainTextBox>
				<MainH1>Goooogle</MainH1>
			</MainTextBox>
			<MainContainer>
				<MainSearchBox>
					<SearchBox
						onChange={e => setSearchInputValue(e.target.value)}
						placeholder="Search"
						onKeyPress={e => {
							if (e.key === "Enter") {
								handleAddLocal();
							}
						}}
					/>
					<SearchBtn onClick={handleAddLocal}>Google 검색</SearchBtn>
				</MainSearchBox>

				{searchState && searchResults.length > 0 && (
					<SearchResultsList>
						{searchResults.map((result, idx) => (
							<SearchResult key={idx}>{result}</SearchResult>
						))}
					</SearchResultsList>
				)}

				{recentSearches.length > 0 && (
					<RecentSearchesContainer>
						<RecentSearchesTitle>최근 검색어</RecentSearchesTitle>
						<RecentSearchesUl>
							{recentSearches.map((recentSearch, idx) => (
								<RecentSearchesLi
									key={idx}
									onClick={() => setSearchInputValue(recentSearch)}
								>
									{recentSearch}
								</RecentSearchesLi>
							))}
						</RecentSearchesUl>
					</RecentSearchesContainer>
				)}
			</MainContainer>
		</>
	);
};

export default Main;

const MainTextBox = styled.div`
	${flexCenter}
	width: 100%;
	height: 200px;
	background: #f2f2f2;
`;

const MainH1 = styled.h1`
	font-size: 70px;
	font-weight: 800;
	color: #111;
`;

const MainContainer = styled.div`
	padding: 20px;
`;

const MainSearchBox = styled.div`
	width: 100%;
	margin-bottom: 20px;
`;

const SearchBox = styled.input`
	width: 85%;
	height: 40px;
	padding: 10px;
	border: 1px solid #dadce0;
	border-radius: 10px 0 0 10px;
	font-size: 18px;
	line-height: 24px;
	&:focus {
		outline: none;
	}
`;

const SearchBtn = styled.button`
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

const SearchResultsList = styled.ul`
	padding: 20px;
	background-color: white;
	border: 0.8px solid grey;
	border-radius: 12px;
`;

const SearchResult = styled.li`
	list-style: none;
	margin-bottom: 20px;
	color: black;
`;

const SearchResultTitle = styled.a`
	font-size: 20px;
	font-weight: 700;
	text-decoration: none;
	color: #1a0dab;
	&:hover {
		text-decoration: underline;
	}
`;

const SearchResultLink = styled.span`
	margin-left: 10px;
	color: #70757a;
`;

const SearchResultSnippet = styled.p`
	font-size: 16px;
	line-height: 22px;
	color: #4f5b66;
	margin-top: 10px;
`;

const RecentSearchesContainer = styled.div`
	margin-top: 20px;
	padding: 20px;
	background-color: white;
	border: 0.8px solid grey;
	border-radius: 12px;
`;

const RecentSearchesTitle = styled.h3`
	font-size: 18px;
	font-weight: 700;
	margin-bottom: 10px;
`;

const RecentSearchesUl = styled.ul`
	padding: 0;
	margin: 0;
	list-style: none;
`;

const RecentSearchesLi = styled.li`
	cursor: pointer;
	margin-bottom: 10px;
	font-size: 16px;
	line-height: 22px;
	color: #4f5b66;
	&:hover {
		text-decoration: underline;
	}
`;
