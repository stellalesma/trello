import { IoMdContact } from "react-icons/io";

function Activity ({ activity, index }) {
    return (
        <div key={activity}>
            <div style={{ display: 'flex' }}>
                <IoMdContact style={{ marginRight: '5px', fontSize: '1.9em' }} />
                <li className="activities">
                    {activity}
                </li>
            </div>
            <p style={{ fontSize: '12px', marginLeft: '34px', marginBottom: '20px' }}>
                <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Edit</span> . <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Delete</span>
            </p>
        </div>
    );
}

export default Activity;
