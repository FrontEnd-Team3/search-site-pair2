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

	// API 호출 함수
	const getSearchInfos = async searchInputValue => {
		try {
			const { data } = await axiosInstance.get("?key=" + searchInputValue);
			setSearchResults(data);
			console.log(searchResults);
			setSearchState(true);
			// localStorage.setItem(`${query}`, JSON.stringify(data));
			// return data;
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

	// 캐싱 구현 함수
	// const sendQuery = async q => {
	// 	const savedQuery = localStorage.getItem(`${q}`);
	// 	if (JSON.parse(savedQuery)) {
	// 		setSearchState(JSON.parse(savedQuery));
	// 		console.log("cachedData");
	// 	} else {
	// 		console.log("newData");
	// 		const data = await getSearchInfos(q);
	// 		setSearchState(data);
	// 	}
	// };

	return (
		<>
			<MainTextBox>
				<MainH1>Goooogle</MainH1>
			</MainTextBox>
			<InputBox>
				<InputBox2>
					<input
						onChange={e => {
							setSearchInputValue(e.target.value);
						}}
					/>
					<button onClick={() => null}>⚲</button>
				</InputBox2>
				{searchState && searchResults.length > 0 && (
					<ul>
						{searchResults.map((result, index) => (
							<li key={index}>{result}</li>
						))}
					</ul>
				)}
			</InputBox>
		</>
	);
};

export default Main;

const InputBox = styled.div`
	${flexCenter}
	align-content: flex-start;
	flex-direction: column;
	ul {
		width: 40%;
		list-style: none;
		background-color: white;
		border: 0.5px solid black;
		color: black;
		text-align: center;
	}
`;

const InputBox2 = styled.div`
	width: 40%;
	/* background-color: black; */
	flex-direction: row;
	input {
		width: 85%;
		border: 0.5px solid black;
	}
	button {
		width: 15%;
		background-color: white;
		border: 0.5px solid black;
	}
`;

const MainTextBox = styled.div`
	margin-bottom: 30px;
`;

const MainH1 = styled.div`
	${flexCenter}
	font-size: 36px;
	font-weight: 800;
`;
