import Main from "pages/main";
import Search from "pages/search";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Main />,
	},
	{
		path: "/search",
		element: <Search />,
	},
]);

export default router;
