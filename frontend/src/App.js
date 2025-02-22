import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
    const [applicants, setApplicants] = useState([]);
    const [name, setName] = useState('');
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false); // New state for loading
    const [error, setError] = useState(null); // New state for error handling

    useEffect(() => {
        fetchApplicants();
    }, [name, status]);

    const fetchApplicants = async () => {
        setLoading(true); // Set loading to true before the API call
        setError(null); // Reset error before fetching
        try {
            const response = await axios.get('http://localhost:5555/applicants', {
                params: { name, status },
            });
            setApplicants(response.data);
        } catch (err) {
            setError('Error fetching applicants.');
        } finally {
            setLoading(false); // Set loading to false after the API call
        }
    };

    return (
        <div>
            <h1>Internship Management</h1>

            {loading && <p>Loading...</p>} {/* Display loading message */}
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}

            <input
                placeholder="Search Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
            />
            <select onChange={(e) => setStatus(e.target.value)} value={status}>
                <option value="">All</option>
                <option value="New">New</option>
                <option value="WIP">WIP</option>
                <option value="Wait">Wait</option>
                <option value="Pass">Pass</option>
                <option value="Fail">Fail</option>
                <option value="Hire">Hire</option>
            </select>

            {applicants.length > 0 ? (
                <ul>
                    {applicants.map((app) => (
                        <li key={app._id}>
                            {app.name} - {app.status}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No applicants found.</p>
            )}
        </div>
    );
};

export default App;
