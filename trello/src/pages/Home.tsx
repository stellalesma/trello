import React from "react";

import Header from "../components/Header";
import AddList from "../components/ManageList/AddList";
import AllLists from "../components/ManageList/AllLists";

function Home({ token } : { token: string }) {
	return (
		<div className="flex flex-col h-full">
			<Header />
			<div className="flex h-full p-3.5 overflow-x-auto">
				<AllLists />
				<AddList />
			</div>
		</div>
	);
}

export default Home;
