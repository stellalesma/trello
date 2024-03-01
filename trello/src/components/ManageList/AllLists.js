import React from "react";

import { useContext } from "react";
import { ListContext } from "../../utils/ListContext";

import List from "./List";

function AllLists() {

	const { lists } = useContext(ListContext);

	return (
		<ul className="flex">
			{lists.map((list, index) => (
				<li key={list.id} className="w-[320px] h-fit p-[10px] mr-[20px] rounded-[10px] box-border bg-[#f5f5f5]">
					<List list={list} index={index} />
				</li>
			))}
		</ul>
	);
}

export default AllLists;
