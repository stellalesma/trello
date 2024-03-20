import React from "react";

import AddList from "../components/ManageList/AddList";
import AllLists from "../components/ManageList/AllLists";

function Home() {
	return (
		<div className="flex h-full p-3.5 overflow-x-auto">
			<AllLists />
			<AddList />
		</div>
	);
}

export default Home;
