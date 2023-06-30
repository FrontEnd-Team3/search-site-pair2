import { useEffect, useRef, useState } from "react";
import { LocalStorageUtils } from "../../../../utils/localstorage";
import RecentQueries from "../recent-queries";
import axiosInstance from "core/@core";
import { useNavigate, useSearchParams } from "react-router-dom";

const SearchBar = () => {
	const [query, setQuery] = useState("");
	const [related, setRelated] = useState([]);
	const [searchParams, setSearchParams] = useSearchParams();
	const navigate = useNavigate();

	let timeoutId;

	const makeDebouncedApiCall = (query, delay = 500) => {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(async () => {
			try {
				const response = await axiosInstance.get("", {
					params: { key: query },
				});
				console.log(response.data);
				setRelated(response.data);
				console.log(new Date());
			} catch (error) {
				console.error("Request error:", error);
				setRelated([]);
			}
		}, delay);
	};

	const check = async () => {
		console.log(query);
		if (query.length) console.log(makeDebouncedApiCall(query));
	};

	useEffect(() => {
		check();
	}, [query]);

	const formRef = useRef();
	const eventFunction = e => {
		e.preventDefault();
		LocalStorageUtils.addNewQuery(formRef.current.query.value);
		console.log(LocalStorageUtils.getRecentQueries());
		searchParams.set("query", formRef.current.query.value);
		navigate(`/search?${searchParams.toString()}`);
	};
	// LocalStorageUtils.clearRecentQueries();
	return (
		<form ref={formRef} onSubmit={eventFunction}>
			<input
				type="text"
				name="query"
				onChange={() => setQuery(formRef.current.query.value)}
			/>
			<button
				type="button"
				onClick={() => {
					LocalStorageUtils.clearRecentQueries();
					window.location.reload(false);
				}}
			>
				검색어 삭제
			</button>
			{query.length ? (
				related.map(oneRelated => <div>{oneRelated}</div>)
			) : (
				<RecentQueries />
			)}
		</form>
	);
};
export default SearchBar;
