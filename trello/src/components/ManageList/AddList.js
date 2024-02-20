import { useState, useContext } from "react";
import { ListContext } from "../../utils/ListContext";

import { FaPlus } from "react-icons/fa6";

function AddList() {
    const [listTitle, setListTitle] = useState("");
    const [showForm, setShowForm] = useState(false);
    const { handleAddList } = useContext(ListContext);

    const handleTitle = (e) => {
        setListTitle(e.target.value);
    };

    const handleNoFocus = () => {
        if (!listTitle.trim()) {
            setShowForm(false);
            setListTitle("");   
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (listTitle.trim()) {
            handleAddList({ title: listTitle, cards: [] });
            setListTitle("");
            setShowForm(false);
        }
    };

    return (
        <div>
            {showForm ? (
                <form onSubmit={handleSubmit} className="addList form">
                    <input type="text" id="list" name="list" placeholder="Enter list title..." value={listTitle} onChange={handleTitle} onBlur={handleNoFocus} className="input" autoFocus/>

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
