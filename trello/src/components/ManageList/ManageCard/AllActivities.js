import React from "react";

import PropTypes from "prop-types";

import Activity from "./Activity";

function AllActivities({ activities }) {
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

AllActivities.propTypes = {
	activities: PropTypes.array.isRequired,
};

export default AllActivities;
