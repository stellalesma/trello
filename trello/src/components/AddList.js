import { useState } from "react";

import { FaPlus } from "react-icons/fa6";

function AddList({ onAddList }) {
    const [showForm, setShowForm] = useState(false);
    const [listTitle, setListTitle] = useState("");

    const handleTitle = (e) => {
        setListTitle(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (listTitle.trim()) {
            onAddList({ title: listTitle, cards: [] });
            setListTitle("");
            setShowForm(false);
        }
    };

    return (
        <div>
            {showForm ? (
                <form onSubmit={handleSubmit} className="addList form">
                    <input type="text" id="list" name="list" placeholder="Enter list title..." value={listTitle} onChange={handleTitle} className="input" autoFocus/>

                    <div>
                        <button style={{marginRight: '10px'}} type="submit" className="enable">Add list</button>
                        <button type="reset" onClick={() => { setShowForm(false); setListTitle("") }} className="disable">Cancel</button>
                    </div>
                </form>
            ) : (
                <p className="addList button" onClick={() => { setShowForm(true) }}>
                    <FaPlus style={{ marginRight: 5 }} />
                    Add a list
                </p>
            )}
        </div>
    );
}

export default AddList;
