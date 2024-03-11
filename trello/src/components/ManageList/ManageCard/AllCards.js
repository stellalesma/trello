import React from "react";

import PropTypes from "prop-types";

import Card from "./Card";
import AddCard from "./AddCard";

function AllCards({ list, listIndex, isFormVisible, setFormState }) {

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

AllCards.propTypes = {
	list: PropTypes.object.isRequired,
	listIndex: PropTypes.number.isRequired,
	setFormState: PropTypes.func.isRequired,
	isFormVisible: PropTypes.bool.isRequired,
};

export default AllCards;
