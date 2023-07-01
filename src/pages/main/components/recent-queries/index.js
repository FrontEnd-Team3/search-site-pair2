import { LocalStorageUtils } from "utils/localstorage";
import SearchList from "../search-list";

const RecentQueries = () => {
	const currStorage = LocalStorageUtils.getRecentQueries();
	console.log(currStorage);
	return <SearchList queries={currStorage} />;
};
export default RecentQueries;
