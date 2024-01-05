import { useState } from "react";

import Card from "./Card";
import CardOptions from "./CardOptions";

function AllCards({ listName, cards, onCardEditing }) {
    const [isCardOptions, setIsCardOptions] = useState(false)
    const [modalCard, setModalCard] = useState(null)

    const handleAddDescription = (id, card, newDescription) => {
        let tmp = card;
        tmp.description = newDescription;
        onCardEditing(id, tmp);
    };

    const handleAddActivity = (id, card, newActivity) => {
        let tmp = card;
        tmp.activities.unshift(newActivity);
        onCardEditing(id, tmp);
    }

    return (
        <ul>
            {cards.map((card, index) =>
                <div key={index}>
                    <li key={index}>
                        <Card card={card} id={index} onCardEditing={onCardEditing} onCardOptions={(mCard) => { setModalCard(mCard); setIsCardOptions(true) }} />
                    </li>

                    {isCardOptions ? <CardOptions listName={listName} card={modalCard} onAddDescription={(description) => handleAddDescription(index, card, description)} onAddActivity={(activity) => handleAddActivity(index, card, activity)} onClose={() => { setIsCardOptions(false) }} /> : null}
                </div>
            )}
        </ul>
    );
}

export default AllCards;
