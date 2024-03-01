import React from "react";

import { FaTrello } from "react-icons/fa";

function Header() {
	return (
		<header>
			<p className='flex items-center justify-center h-[25px] bg-[#808080]/50 text-[#f5f5f5]/50'>
				<FaTrello className="mr-[5px]" />
                Trello
			</p>
		</header>
	);
}

export default Header;
