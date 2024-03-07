import React from "react";

import { useContext } from "react";
import { ListContext } from "../../utils/ListContext";

import List from "./List";

function AllLists() {

	const { lists } = useContext(ListContext);

	return (
		<ul className="flex">
			{lists.map((list, index) => (
				<li key={list.id} className="w-80 h-fit p-2.5 mr-5 rounded-lg box-border bg-neutral-100">
					<List list={list} index={index} />
				</li>
			))}
		</ul>
	);
}

export default AllLists;
