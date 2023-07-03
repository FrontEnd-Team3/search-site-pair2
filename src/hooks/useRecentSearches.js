import { useEffect, useState } from "react";

const useRecentSearches = () => {
	const [recentSearches, setRecentSearches] = useState([]);

	useEffect(() => {
		const recentSearches =
			JSON.parse(localStorage.getItem("recentSearches")) || [];
		setRecentSearches(recentSearches);
	}, []);

	const handleAddLocal = newSearchValue => {
		const newRecentSearches = recentSearches.filter(
			search => search !== newSearchValue,
		);
		newRecentSearches.unshift(newSearchValue);
		const recentSearchesLimited = newRecentSearches.slice(0, 5);
		setRecentSearches(recentSearchesLimited);
		localStorage.setItem(
			"recentSearches",
			JSON.stringify(recentSearchesLimited),
		);
	};

	return { recentSearches, handleAddLocal };
};

export default useRecentSearches;
