import axiosInstance from "./@core";

let timeoutId;

const makeDebouncedApiCall = (query, delay = 300) => {
	clearTimeout(timeoutId);
	timeoutId = setTimeout(async () => {
		try {
			const response = await axiosInstance.get("", {
				params: { key: query },
			});
			console.log(response.data);
			console.log(new Date());
		} catch (error) {
			console.error("Request error:", error);
		}
	}, delay);
};

export default makeDebouncedApiCall;
