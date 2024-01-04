import { useState } from "react";

import { FaPlus } from "react-icons/fa6";

function AddCard({ onAddCard }) {
    const [showForm, setShowForm] = useState(false);
    const [cardTitle, setCardTitle] = useState("");

    const handleTitle = (e) => {
        setCardTitle(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (cardTitle.trim()) {
            onAddCard({ title: cardTitle, description: "", activities: [] });
            setCardTitle("");
            setShowForm(false);
        }
    };

    return (
        <div>
            {showForm ? (
                <form onSubmit={handleSubmit} className="addCard form">
                    <textarea type="text" id="card" name="card" placeholder="Enter a title for this card..." value={cardTitle} onChange={handleTitle} className="card" autoFocus />

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
