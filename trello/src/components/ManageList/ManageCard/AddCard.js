import { useState, useContext } from "react";
import { ListContext } from "../../../utils/ListContext";

import { FaPlus } from "react-icons/fa6";

function AddCard({ list, listIndex }) {
    const [cardTitle, setCardTitle] = useState("");
    const [showForm, setShowForm] = useState(false);
    const { updatedId, handleListEditing } = useContext(ListContext);

    const handleTitle = (e) => {
        setCardTitle(e.target.value);
    };

    const handleBlur = () => {
        if (!cardTitle.trim())
            setShowForm(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (cardTitle.trim()) {
            const newCard = { listId: list.id, id: updatedId(), title: cardTitle, description: "", activities: [] };
            handleListEditing(listIndex, {...list, cards: [...list.cards, newCard]});
            setCardTitle("");
            setShowForm(false);
        }
    };

    return (
        <div>
            {showForm ? (
                <form onSubmit={handleSubmit} className="addCard form">
                    <textarea id="card" name="card" placeholder="Enter a title for this card..." value={cardTitle} onChange={handleTitle} onBlur={handleBlur} className="card" autoFocus />

                    <div>
                        <button style={{marginRight: '10px'}} type="submit" className="enable">Add card</button>
                        <button type="reset" onClick={() => { setShowForm(false); setCardTitle("") }} className="disable">Cancel</button>
                    </div>
                </form>
            ) : (
                <p className="addCard button" onClick={() => { setShowForm(true) }}>
                    <FaPlus style={{ marginRight: 7 }} />
                    Add a card
                </p>
            )}
        </div>
    );
}

export default AddCard;
