import React from "react";

import { FaTrello } from "react-icons/fa";

function Header() {
	return (
		<header>
			<p className='flex items-center justify-center h-6 bg-stone-500/40 text-neutral-100/50'>
				<FaTrello className="mr-1.5" />
                Trello
			</p>
		</header>
	);
}

export default Header;
