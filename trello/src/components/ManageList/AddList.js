import { useState, useContext } from "react";
import { ListContext } from "../../utils/ListContext";

import { FaPlus } from "react-icons/fa6";

function AddList() {
    const [listTitle, setListTitle] = useState("");
    const [showForm, setShowForm] = useState(false);
    const { updatedId, handleAddList } = useContext(ListContext);

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
            handleAddList({ id: updatedId(), title: listTitle, cards: [] });
            setListTitle("");
            setShowForm(false);
        }
    };

    return (
        <div>
            {showForm ? (
                <form onSubmit={handleSubmit} className="w-[300px] p-[10px] rounded-[10px] bg-white">
                    <input type="text" id="list" name="list" placeholder="Enter list title..." value={listTitle} onChange={handleTitle} onBlur={handleNoFocus} className="w-full h-[36px] p-[10px] mb-[10px] rounded-[3px] box-border border outline-[#dcdcdc] focus:outline-[#01d2ee]" autoFocus/>

                    <div>
                        <button type="submit" className="mr-[10px] text-white bg-[#01d2ee]">Add list</button>
                        <button type="reset" onClick={() => { setShowForm(false); setListTitle("") }} className="text-[#4a4a4a] hover:bg-[#ECE9E9]">Cancel</button>
                    </div>
                </form>
            ) : (
                <p className="flex items-center w-[300px] h-[50px] pl-[10px] font-bold rounded-[10px] text-white bg-[#f5f5f5]/30 hover:bg-[#f5f5f5]/10  cursor-pointer" onClick={() => { setShowForm(true) }}>
                    <FaPlus className="mr-[5px]"/>
                    Add a list
                </p>
            )}
        </div>
    );
}

export default AddList;
