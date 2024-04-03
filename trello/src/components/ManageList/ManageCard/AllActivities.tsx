import React, { useContext, useEffect } from "react";

import axios from "axios";

import Activity from "./Activity";

import { ListContext } from "../../../utils/ListContext";
import { useAccessToken } from "../../../utils/AccessTokenContext";

function AllActivities({ cardId }: { cardId: number }) {
	const { config } = useAccessToken();
	const { activities, updateActivities } = useContext(ListContext);

	useEffect(() => {
		const getActivities = async () => {	
			try {
				const response = await axios.get("http://localhost:8081/comments/", config);
				updateActivities(response.data);
			} catch (error) {
				console.error("Cannot load cards / activities :", error);
			}
		};

		getActivities();
	}, []);

	return (
		<ul>
			{activities
				.filter((activity) => activity.task_id === cardId)
				.sort((a, b) => b.id - a.id)
				.map((activity) =>
					<div key={activity.id}>
						<Activity activity={activity} />
					</div>
				)}
		</ul>
	);
}

export default AllActivities;
