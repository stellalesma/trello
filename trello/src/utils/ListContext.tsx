import React, { createContext, useState, ReactNode } from "react";

import { ListObject } from "types/Types";

const listData = [
	{
		"id": 1,
		"title": "To Do",
		"cards": []
	},
	{
		"id": 2,
		"title": "In Progress",
		"cards": []
	},
	{
		"id": 3,
		"title": "Done",
		"cards": []
	},
];

type ListContextType = {
	lists: ListObject[],
	getUpdatedId: () => number,
	handleAddList: (newList: ListObject) => void,
	handleListEditing: (index: number, newList: ListObject) => void,
	handleModifiedLists: (newLists: ListObject[]) => void,
};

const defaultValue: ListContextType = {
	lists: [],
	getUpdatedId: () => 0,
	handleAddList: () => {},
	handleListEditing: () => {},
	handleModifiedLists: () => {}
};

export const ListContext = createContext<ListContextType>(defaultValue);

export const ListProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

	const [lastId, setLastId] = useState<number>(3);
	const [lists, setLists] = useState<ListObject[]>(listData);

	const getUpdatedId = () => {
		setLastId(prevId => prevId + 1);
		return lastId + 1;
	};

	const handleAddList = (newList: ListObject) => {
		setLists([...lists, newList]);
	};

	const handleListEditing = (index: number, newList: ListObject) => {
		const tmp = lists.slice();
		tmp[index] = newList;
		setLists(tmp);
	};

	const handleModifiedLists = (newLists: ListObject[]) => {
		setLists(newLists);
	};

	const contextValue: ListContextType = {
		lists: lists,
		getUpdatedId: getUpdatedId,
		handleAddList: handleAddList,
		handleListEditing: handleListEditing,
		handleModifiedLists: handleModifiedLists,
	};

	console.log(lists);

	return <ListContext.Provider value={contextValue}>{children}</ListContext.Provider>;
};
