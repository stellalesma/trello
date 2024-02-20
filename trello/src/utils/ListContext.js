import { createContext, useState } from "react";

export const ListContext = createContext();

export const ListProvider = ({ children }) => {
	const [lists, setLists] = useState([]);

	const handleAddList = (newList) => {
		setLists([...lists, newList]);
	};

    const handleListEditing = (id, newList) => {
		const tmp = lists.slice();
		tmp[id] = newList;
		setLists(tmp);
	};

    const handleReorganizeLists = (newLists) => {
		console.log("all home", lists);
        setLists(newLists);
    };

	const contextValue = {
		lists,
		handleAddList,
		handleListEditing,
		handleReorganizeLists,
	};

	return (
		<ListContext.Provider value={contextValue}>
			{children}
		</ListContext.Provider>
	);
};
