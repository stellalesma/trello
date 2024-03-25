import React from "react";

import Activity from "./Activity";
import { ActivityObject } from "types/Types";

function AllActivities({ activities }: { activities: ActivityObject[] }) {
	return (
		<ul>
			{activities.map((activity) =>
				<div key={activity.id}>
					<Activity activity={activity} />
				</div>
			)}
		</ul>
	);
}

export default AllActivities;
