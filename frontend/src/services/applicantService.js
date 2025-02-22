import axios from 'axios';

export const getApplicantsByRole = async () => {
  try {
    const response = await axios.get('http://localhost:5555/applicants');
    return response.data;
  } catch (error) {
    console.error("Error fetching applicants:", error);
    return [];
  }
};
