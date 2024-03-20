import React, { useContext } from "react";

import List from "./List";
import { ListContext } from "../../utils/ListContext";

function AllLists() {

	const { lists } = useContext(ListContext);

	return (
		<ul className="flex snap-x">
			{lists.map((list, index) => (
				<li key={list.id} className="snap-end w-72 md:w-80 h-fit p-2.5 mr-5 rounded-lg box-border bg-neutral-100">
					<List list={list} index={index} />
				</li>
			))}
		</ul>
	);
}

export default AllLists;
