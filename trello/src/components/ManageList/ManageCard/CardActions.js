import { useState } from "react";

import { IoIosArrowRoundForward } from "react-icons/io";

import MoveCard from "./MoveCard";

function CardActions({ allLists, card, listName, onReorganize }) {
    const [isMoveCard, setIsMoveCard] = useState(false);

    return (
        <div>
            <p className="actions">Actions</p>
            <p className="actionsList" onClick={() => { setIsMoveCard(true) }}>
                <IoIosArrowRoundForward style={{ marginRight: '10px', fontSize: '1.2em' }} />
                Move
            </p>
            {isMoveCard ? <MoveCard allLists={allLists} listName={listName} card={card} onClose={() => { setIsMoveCard(false) }} onReorganize={onReorganize} /> : null}
        </div>

    );
}

export default CardActions;
