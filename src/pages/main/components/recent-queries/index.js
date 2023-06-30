import { LocalStorageUtils } from "utils/localstorage";

const RecentQueries = () => {
	const currStorage = LocalStorageUtils.getRecentQueries();
	console.log(currStorage);
	return (
		<>
			{currStorage.map(oneQuery => (
				<div>{oneQuery}</div>
			))}
		</>
	);
};
export default RecentQueries;
