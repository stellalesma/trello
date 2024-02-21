import { createContext, useState } from "react";

const listData = [
    {
        title: "list 1",
        cards: [
        {
            title: "L1 C1",
            description: "",
            activities: [],
        },
        {
            title: "L1 C2",
            description: "",
            activities: [],
        },
        {
            title: "L1 C3",
            description: "",
            activities: [],
        },
        ],
    },
    {
        title: "list 2",
        cards: [
        {
            title: "L2 C1",
            description: "",
            activities: [],
        },
        {
            title: "L2 C2",
            description: "",
            activities: [],
        },
        ],
    },
];

export const ListContext = createContext();

export const ListProvider = ({ children }) => {
    const [lists, setLists] = useState(listData);

    const handleAddList = (newList) => {
        setLists([...lists, newList]);
    };

    const handleListEditing = (id, newList) => {
        const tmp = lists.slice();
        tmp[id] = newList;
        setLists(tmp);
    };

    const handleReorganizeLists = (newLists) => {
        setLists(newLists);
    };

    const contextValue = {
        lists,
        handleAddList,
        handleListEditing,
        handleReorganizeLists,
    };

    return (
        <ListContext.Provider value={contextValue}>{children}</ListContext.Provider>
    );
};
