import { useState } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";

import MoveCard from "./MoveCard";

function CardActions({ card, listName, onMainClose }) {
    const [isMoveCard, setIsMoveCard] = useState(false);

    return (
        <div>
            <p className="actions">Actions</p>
            <p className="actionsList" onClick={() => { setIsMoveCard(true) }}>
                <IoIosArrowRoundForward style={{ marginRight: '10px', fontSize: '1.2em' }} />
                Move
            </p>
            {isMoveCard ? <MoveCard listName={listName} card={card} onClose={() => { setIsMoveCard(false) }} onMainClose={onMainClose} /> : null}
        </div>
    );
}

export default CardActions;
