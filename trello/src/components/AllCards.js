import Card from "./Card";

function AllCards({ listName, cards, onCardEditing }) {

    const displayCards = cards.map((card, index) =>
        <li key={index}>
            <Card listName={listName} card={card} id={index} onCardEditing={onCardEditing} />
        </li>
    );

    return (
        <ul>{displayCards}</ul>
    );
}

export default AllCards;
