import { useEffect } from "react";
import deleteUser from "./actions/deleteUser";
import Users from "./components/Users";
import { Outlet } from "react-router";

function App() {
	return (
		<div className="font-default overflow-x-hidden">
			<Outlet />
		</div>
	);
}

export default App;
