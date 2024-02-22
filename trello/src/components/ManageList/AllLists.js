import { useContext } from "react";
import { ListContext } from "../../utils/ListContext";

import List from "./List";

function AllLists() {

    const { lists } = useContext(ListContext);

    return (
        <ul className="ulLists">
            {lists.map((list, index) => (
                <li key={list.id} className="liLists">
                    <List list={list} index={index} />
                </li>
            ))}
        </ul>
    );
}

export default AllLists;
