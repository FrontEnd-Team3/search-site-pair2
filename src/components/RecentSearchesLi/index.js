import styled from "styled-components";

function RecentSearchesLi({ data, onClick }) {
	return data.map((item, index) => (
		<>
			<RecentSearchesList key={index} onClick={() => onClick(index)}>
				{item}
			</RecentSearchesList>
		</>
	));
}

export default RecentSearchesLi;

const RecentSearchesList = styled.li`
	cursor: pointer;
	margin-bottom: 10px;
	font-size: 16px;
	line-height: 22px;
	color: black;
	&:hover {
		background-color: #e9e9e9;
	}
`;
