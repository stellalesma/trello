import { FaTrello } from "react-icons/fa";

function Header() {
    return (
        <header>
            <p className='header'>
                <FaTrello style={{ marginRight: 5 }} />
                Trello
            </p>
        </header>
    );
}

export default Header;
