import React from "react";

import PropTypes from "prop-types";

import Card from "./Card";

function AllCards({ list, listIndex }) {
	return (
		<ul className="overflow-y-auto max-h-[calc(100vh - 260px)]">
			{list.cards.map((card) =>
				<li key={card.id}>
					<Card card={card} listName={list.title} listIndex={listIndex} />
				</li>
			)}
		</ul>
	);
}

AllCards.propTypes = {
	list: PropTypes.object.isRequired,
	listIndex: PropTypes.number.isRequired,
};

export default AllCards;
