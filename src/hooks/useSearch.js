import { axiosInstance } from "apis/@core";
import { useEffect, useState } from "react";

const useSearch = inputValue => {
	const [searchResults, setSearchResults] = useState([]);
	const [searchState, setSearchState] = useState(false);

	useEffect(() => {
		if (inputValue) {
			getSearchInfos(inputValue);
		} else {
			setSearchState(false);
		}
	}, [inputValue]);

	const getSearchInfos = async inputValue => {
		try {
			const { data } = await axiosInstance.get("?key=" + inputValue);
			setSearchResults(data);
			setSearchState(true);
		} catch (err) {
			console.log("err");
		}
	};

	return { searchResults, searchState, setSearchResults };
};

export default useSearch;
