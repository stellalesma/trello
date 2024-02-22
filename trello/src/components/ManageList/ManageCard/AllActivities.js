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

export default AllActivities;
