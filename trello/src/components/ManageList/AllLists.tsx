import React, { useContext, useEffect } from "react";

import axios from "axios";

import List from "./List";

import { ListContext } from "../../utils/ListContext";
import { useAccessToken } from "../../utils/AccessTokenContext";

function AllLists() {
	const { config } = useAccessToken();
	const { lists, updateLists } = useContext(ListContext);

	useEffect(() => {
		const getLists = async () => {
			try {
				const response = await axios.get("http://localhost:8081/task-list", config);
				updateLists(response.data);
			} catch (error) {
				console.error("Cannot load lists :", error);
			}
		};

		getLists();
	}, []);

	return (
		<ul className="flex snap-x">
			{lists.map((list) => (
				<li key={list.id} className="snap-end w-72 md:w-80 h-fit p-2.5 mr-5 rounded-lg box-border bg-neutral-100">
					<List list={list} />
				</li>
			))}
		</ul>
	);
}

export default AllLists;
