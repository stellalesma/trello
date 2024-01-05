import List from "./List";

function AllLists({ lists, onListEditing }) {
    return (
        <ul className="ulLists">
            {lists.map((list, index) =>
                <li key={index} className="liLists">
                    <List currentList={list} id={index} onListEditing={onListEditing} />
                </li>
            )}
        </ul>
    );
}

export default AllLists;
