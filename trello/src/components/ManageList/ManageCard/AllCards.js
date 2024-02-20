import { useState } from "react";

import Card from "./Card";
import CardOptions from "./CardOptions";

function AllCards({ allLists, listName, cards, onCardEditing, onReorganize }) {
    const [isCardOptions, setIsCardOptions] = useState(false);
    const [modalCard, setModalCard] = useState(null);

    // console.log("all 2", allLists);
    // console.log("cards 2", cards);

    const handleAddDescription = (card, newDescription) => {
        let tmp = card;
        tmp.description = newDescription;
    };

    const handleAddActivity = (card, newActivity) => {
        let tmp = card;
        tmp.activities.unshift(newActivity);
    }

    return (
        <ul>
            {cards.map((card, index) =>
                <div key={index}>
                    <li key={index}>
                        <Card card={card} id={index} onCardEditing={onCardEditing} onCardOptions={(mCard) => { setModalCard(mCard); setIsCardOptions(true) }} />
                    </li>

                    {isCardOptions ? <CardOptions allLists={allLists} listName={listName} card={modalCard} onAddDescription={(description) => handleAddDescription(modalCard, description)} onAddActivity={(activity) => handleAddActivity(modalCard, activity)} onClose={() => { setIsCardOptions(false) }} onReorganize={onReorganize} /> : null}
                </div>
            )}
        </ul>
    );
}

export default AllCards;
