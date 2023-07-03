import styled from "styled-components";

function SearchBox({ value, onChange, onKeyPress }) {
	return (
		<div>
			<SearchInputBox
				type="text"
				value={value}
				onChange={onChange}
				onKeyPress={onKeyPress}
				placeholder="검색어를 입력하세요."
			/>
		</div>
	);
}

export default SearchBox;

const SearchInputBox = styled.input`
	width: 700px;
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
