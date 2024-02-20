import { useContext } from "react";
import { ListContext } from "../../utils/ListContext";

import List from "./List";

// un probleme avec les index ??

function AllLists() {

    const { lists } = useContext(ListContext);

    return (
        <ul className="ulLists">
            {lists.map((list, index) => (
                <li key={index} className="liLists">
                    <List currentList={list} id={index} />
                </li>
            ))}
        </ul>
    );
}

export default AllLists;
