import { useState } from "react";

import { MdOutlineModeEditOutline } from "react-icons/md";

function Card({ card, id, onCardEditing, onCardOptions }) {
    const [isTitleEditing, setIsTitleEditing] = useState(false);
    const [cardTitle, setCardTitle] = useState(card.title)

    const handleSubmit = (event, id) => {
        event.preventDefault();
        
        if (cardTitle.trim()) {
            let tmp = card;
            tmp.title = cardTitle;
            onCardEditing(id, tmp);
            setIsTitleEditing(false);
        }
    };

    return (
        <div>
            {isTitleEditing ? (
                <form onSubmit={(event) => handleSubmit(event, id)}>
                    <textarea className="cardTitleEditing" id='cardEditing' name="cardEditing" value={cardTitle} onChange={(event) => { setCardTitle(event.target.value) }} autoFocus />
                    <div style={{ marginBottom: '10px'}}>
                        <button type="submit" style={{ marginRight: '10px' }} className="enable">Save</button>
                        <button type="reset" onClick={() => { setIsTitleEditing(false); setCardTitle(card.title) }} className="disable">Cancel</button>
                    </div>
                </form>
            ) : (
                <p className="card cardEditing" onClick={() => onCardOptions(card, id)}>
                    {cardTitle}
                    <MdOutlineModeEditOutline className="editIcon" onClick={(event) => { event.stopPropagation(); setIsTitleEditing(true) }} />
                </p>
            )}
        </div>
    );
}

export default Card;
