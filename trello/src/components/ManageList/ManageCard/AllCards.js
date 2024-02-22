import Card from "./Card";

function AllCards({ list, listIndex }) {
    return (
        <ul>
            {list.cards.map((card) =>
                <li key={card.id}>
                    <Card card={card} listName={list.title} listIndex={listIndex} />
                </li>
            )}
        </ul>
    );
}

export default AllCards;
