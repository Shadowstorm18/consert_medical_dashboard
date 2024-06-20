const testFetch = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/patient_data/1');
      if (!response.ok) {
        throw new Error(`Error fetching patient data: ${response.statusText}`);
      }
      const data = await response.json();
      console.log('Patient Data:', data);
    } catch (error) {
      console.error('Error fetching patient data:', error);
    }
  };
  
  testFetch();