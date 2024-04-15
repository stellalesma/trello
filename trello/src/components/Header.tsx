import React from "react";
import { Link } from "react-router-dom";
import { FaTrello } from "react-icons/fa";

function Header() {
	return (
		<nav className="w-screen flex-row grid grid-cols-[1fr_auto] items-center h-6 bg-stone-500/40 cursor-default">
			<Link to="/home" className='flex items-center justify-center text-neutral-100/50 cursor-pointer'>
				<FaTrello className="mr-1.5" />
                Trello
			</Link>
			<Link to="/settings" className="px-5 text-fuchsia-700 text-sm font-bold cursor-pointer hover:opacity-60">Settings</Link>
		</nav>
	);
}

export default Header;
