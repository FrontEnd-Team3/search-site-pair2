import { LOCALSTORAGE_RECENTQUERIES } from "./consts";

export const LocalStorageUtils = {
	getRecentQueries() {
		if (!localStorage.getItem(LOCALSTORAGE_RECENTQUERIES))
			localStorage.setItem(LOCALSTORAGE_RECENTQUERIES, JSON.stringify([]));
		return JSON.parse(localStorage.getItem(LOCALSTORAGE_RECENTQUERIES));
	},
	addNewQuery(newQuery) {
		const currStorage = this.getRecentQueries();
		const index = currStorage.findIndex(element => element === newQuery);
		if (index === -1)
			localStorage.setItem(
				LOCALSTORAGE_RECENTQUERIES,
				JSON.stringify([newQuery, ...currStorage].slice(0, 5)),
			);
		else
			localStorage.setItem(
				LOCALSTORAGE_RECENTQUERIES,
				JSON.stringify([
					newQuery,
					...currStorage.slice(0, index),
					...currStorage.slice(index + 1),
				]),
			);
	},
	clearRecentQueries() {
		localStorage.setItem(LOCALSTORAGE_RECENTQUERIES, JSON.stringify([]));
	},
};
