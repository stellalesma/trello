import React, { useEffect, useContext } from "react";

import axios from "axios";

import Card from "./Card";
import AddCard from "./AddCard";

import { ListContext } from "../../../utils/ListContext";
import { ListObject } from "../../../types/Types";
import { useAccessToken } from "../../../utils/AccessTokenContext";

type AllCardsProps = {
	list: ListObject,
	isFormVisible: boolean,
	setFormState: (state: boolean) => void,
};

function AllCards({ list, isFormVisible, setFormState }: AllCardsProps) {
	const { config } = useAccessToken();
	const { cards, updateCards } = useContext(ListContext);

	useEffect(() => {
		const getCards = async () => {	
			try {
				const response = await axios.get("http://localhost:8081/tasks/", config);
				updateCards(response.data);
			} catch (error) {
				console.error("Cannot load lists / cards :", error);
			}
		};

		getCards();
	}, []);

	return (
		<div className="overflow-y-auto">
			<ul>
				{cards
					.filter((card) => card.task_list_id === list.id)
					.map((card) => (
						<li key={card.id}>
							<Card card={card} list={list} />
						</li>
					))}
			</ul>
			{isFormVisible ? <AddCard list={list} setFormState={setFormState} /> : null}
		</div>
	);
}

export default AllCards;
