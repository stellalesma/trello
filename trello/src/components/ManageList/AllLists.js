// import { useState } from "react";
import List from "./List";

function AllLists({ lists, onListEditing, onReorganize }) {
    // const [changedLists, setChangedLits] = useState(lists);

    // const handleReorganizeLists = (newLists) => {
    //     console.log("all 0", lists);
    //     // console.log("cards 0", list.cards);
    //     setChangedLits(newLists);
    // };

    return (
        <ul className="ulLists">
            {lists.map((list, index) => (
                <li key={index} className="liLists">
                    <List
                        allLists={lists}
                        currentList={list}
                        id={index}
                        onListEditing={onListEditing}
                        onReorganize={onReorganize}
                    />
                </li>
            ))}
        </ul>
    );
}

export default AllLists;
