import { useState, useContext } from "react";
import { ListContext } from "../../../utils/ListContext";
import { MdOutlineModeEditOutline } from "react-icons/md";

import CardOptions from "./CardOptions";

function Card({ card, listName, listIndex }) {
    const [cardTitle, setCardTitle] = useState(card.title);
    const [isTitleEditing, setIsTitleEditing] = useState(false);
    const [showCardOptions, setShowCardOptions] = useState(false);

    const { lists, handleListEditing } = useContext(ListContext);

    const handleBlur = () => {
        if (!cardTitle.trim()) {
            setIsTitleEditing(false);
            setCardTitle(card.title);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (cardTitle.trim()) {
            const list = lists[listIndex];
            const newCard = {...card, title: cardTitle};
            const tmp = {
                ...list,
                cards: list.cards.map((object) => object.id === card.id ? newCard : object)
            };
    
            handleListEditing(listIndex, tmp);
            setIsTitleEditing(false);
        }
    };

    return (
        <div>
            {isTitleEditing ? (
                <form onSubmit={(event) => handleSubmit(event)}>
                    <textarea className="cardTitleEditing" id='cardEditing' name="cardEditing" value={cardTitle} onChange={(event) => { setCardTitle(event.target.value) }}  onBlur={handleBlur} autoFocus />
                    <div style={{ marginBottom: '10px'}}>
                        <button type="submit" style={{ marginRight: '10px' }} className="enable">Save</button>
                        <button type="reset" onClick={() => { setIsTitleEditing(false); setCardTitle(card.title) }} className="disable">Cancel</button>
                    </div>
                </form>
            ) : (
                <p className="card cardEditing" onClick={() => setShowCardOptions(true)}>
                    {cardTitle}
                    <MdOutlineModeEditOutline className="editIcon" onClick={(event) => { event.stopPropagation(); setIsTitleEditing(true) }} />
                </p>
            )}

            {showCardOptions ? <CardOptions listName={listName} card={card} onClose={() => { setShowCardOptions(false) }} /> : null}
        </div>
    );
}

export default Card;
