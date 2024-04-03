import React, { createContext, useState, ReactNode } from "react";

import { ActivityObject, CardObject, ListObject } from "types/Types";

type ListContextType = {
	userId: number,
	lists: ListObject[],
	cards: CardObject[],
	activities: ActivityObject[],
	setUserId: (userId: number) => void,
	updateLists: (newLists: ListObject[]) => void,
	updateCards: (newCards: CardObject[]) => void,
	updateActivities: (newActivities: ActivityObject[]) => void,
};

const defaultValue: ListContextType = {
	userId: 0,
	lists: [],
	cards: [],
	activities: [],
	setUserId: () => {},
	updateLists: () => {},
	updateCards: () => {},
	updateActivities: () => {},
};

export const ListContext = createContext<ListContextType>(defaultValue);

export const ListProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [userId, setUserId] = useState<number>(0);
	const [lists, setLists] = useState<ListObject[]>([]);
	const [cards, setCards] = useState<CardObject[]>([]);
	const [activities, setActivities] = useState<ActivityObject[]>([]);

	const updateLists = (newLists: ListObject[]) => {
		setLists(newLists);
	};

	const updateCards = (newCards: CardObject[]) => {
		setCards(newCards);
	};

	const updateActivities = (newActivities: ActivityObject[]) => {
		setActivities(newActivities);
	};

	const contextValue: ListContextType = {
		lists: lists,
		cards: cards,
		userId: userId,
		setUserId: setUserId,
		activities: activities,
		updateLists: updateLists,
		updateCards: updateCards,
		updateActivities: updateActivities,
	};

	console.log("lists:", lists);
	console.log("cards:", cards);
	console.log("activities:", activities);

	return <ListContext.Provider value={contextValue}>{children}</ListContext.Provider>;
};
