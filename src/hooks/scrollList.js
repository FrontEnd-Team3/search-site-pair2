const ScrollListEventHandler =
	(queries, selectedIndex, setSelectedIndex) => event => {
		const len = queries.length;
		console.log(selectedIndex);

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
export default ScrollListEventHandler;
