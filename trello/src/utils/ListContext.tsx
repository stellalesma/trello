import React, { createContext, useState, ReactNode } from "react";

import { ActivityObject, CardObject, ListObject } from "types/Types";

type ListContextType = {
	lists: ListObject[],
	cards: CardObject[],
	activities: ActivityObject[],
	updateLists: (newLists: ListObject[]) => void,
	updateCards: (newCards: CardObject[]) => void,
	updateActivities: (newActivities: ActivityObject[]) => void,
};

const defaultValue: ListContextType = {
	lists: [],
	cards: [],
	activities: [],
	updateLists: () => {},
	updateCards: () => {},
	updateActivities: () => {},
};

export const ListContext = createContext<ListContextType>(defaultValue);

export const ListProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
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
		activities: activities,
		updateLists: updateLists,
		updateCards: updateCards,
		updateActivities: updateActivities,
	};

	return <ListContext.Provider value={contextValue}>{children}</ListContext.Provider>;
};
