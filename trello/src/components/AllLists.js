import List from "./List";

function AllLists({ lists, onListEditing }) {

    const displayAll = lists.map((list, index) =>
        <li key={index} className="liLists">
            <List currentList={list} id={index} onListEditing={onListEditing}/>
        </li>
    );

    return (
        <ul className="ulLists">{displayAll}</ul>
    );
}

export default AllLists;
