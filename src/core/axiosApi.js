import axiosInstance from "./@core";

const search = async (query) => {
  return await axiosInstance.get("/", { params: { key: query } });
};
export default search;
