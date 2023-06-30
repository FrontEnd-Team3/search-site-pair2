import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "routes/routing";
// import makeThrottledAndCancellableApiCall from "./core/throttleAndCancel";

function App() {
	// setInterval(() => {
	// 	makeThrottledAndCancellableApiCall("가");
	// }, 2);
	// return <div className="App">안녕</div>;
	return <RouterProvider router={router} />;
}

export default App;
