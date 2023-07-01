import { useNavigate } from "react-router-dom";
import { LocalStorageUtils } from "utils/localstorage";
import styled from "styled-components";
import { useEffect, useState } from "react";

const SearchList = ({ queries }) => {
	const [selectedIndex, setSelectedIndex] = useState(null);
	const navigate = useNavigate();

	const ScrollList = event => {
		const len = queries.length;
		console.log(len);
		console.log(selectedIndex);
		// 기존의 동작 없애기
		if (event.key === "ArrowUp") {
			event.preventDefault();
			if (selectedIndex === null) setSelectedIndex(len - 1);
			else {
				setSelectedIndex(prev => (prev - 1 + len) % len);
			}
		} else if (event.key === "ArrowDown") {
			event.preventDefault();
			if (selectedIndex === null) setSelectedIndex(0);
			else {
				setSelectedIndex(prev => (prev + 1) % len);
			}
		}

		if (event.key === "Enter" && selectedIndex !== null) {
			const curr = queries[selectedIndex];
			LocalStorageUtils.addNewQuery(curr);
			navigate(`/search?query=${curr}`);
		}
	};

	useEffect(() => {
		document.addEventListener("keydown", ScrollList);

		return () => {
			document.removeEventListener("keydown", ScrollList);
		};
	}, [selectedIndex]);

	return (
		<>
			{queries.map((query, index) => (
				<ListItem
					onClick={() => {
						LocalStorageUtils.addNewQuery(query);
						navigate(`/search?query=${query}`);
					}}
					selected={selectedIndex === index}
				>
					{query}
				</ListItem>
			))}
		</>
	);
};
const ListItem = styled.div`
	background-color: ${({ selected }) => (selected ? "#d9d9d9" : "transparent")};
	&:hover {
		background-color: #d9d9d9;
	}
`;

export default SearchList;
