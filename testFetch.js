const axios = require('axios');

const fetchPatientData = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/patient_data/2', {
      proxy: {
        host: '127.0.0.1',
        port: 8000,
      },
    });
    console.log('Patient Data:', response.data);
  } catch (error) {
    console.error('Error fetching patient data:', error);
  }
};

fetchPatientData();