import search from "core/axiosApi";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Search = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [results, setResults] = useState([]);
	const navigate = useNavigate();
	const query = searchParams.get("query");

	const setQuery = async () => {
		try {
			const res = await search(query);
			setResults(res.data);
		} catch (err) {
			console.log(err);
			setResults([]);
		}
	};
	setQuery();
	// 가능하면 이거 헤더 컴포넌트로 빼기
	return (
		<>
			<button type="button" onClick={() => navigate("/")}>
				검색 페이지로 돌아가기
			</button>
			{results.map(result => (
				<div>{result}</div>
			))}
		</>
	);
};

export default Search;
