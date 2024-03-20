import React from "react";

import Card from "./Card";
import AddCard from "./AddCard";
import { ListObject } from "types/Types";

type AllCardsProps = {
	list: ListObject,
	listIndex: number,
	isFormVisible: boolean,
	setFormState: (state: boolean) => void,
}

function AllCards({ list, listIndex, isFormVisible, setFormState }: AllCardsProps) {

	return (
		<div className="overflow-y-auto">

			<ul>
				{list.cards.map((card) =>
					<li key={card.id}>
						<Card card={card} listName={list.title} listIndex={listIndex} />
					</li>
				)}
			</ul>

			{isFormVisible ? <AddCard list={list} listIndex={listIndex} setFormState={setFormState} /> : null}

		</div>
	);
}

export default AllCards;
