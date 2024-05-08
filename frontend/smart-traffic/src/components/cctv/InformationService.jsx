
class InformationService {
    static addInformation(newData) {
      return fetch(`http://54.215.68.185:8080/cctv/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)
      })
      .then(response => {
        if (!response.ok) {
            console.log('Failed to add new cctv')
          throw new Error('Failed to add new cctv');
        }
        return response.json();
      })
      .catch(error => {
        // Handle error, such as displaying an error message to the user
        console.error('Error adding new information:', error);
        throw error; // Rethrow the error to handle it in the component
      });
    }
  
    static updateInformation(itemId, updatedData) {
      return fetch(`http://54.215.68.185:8080/cctv/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update information');
        }
        // Optionally, you can return additional data or handle success here
        return response.json();
      })
      .catch(error => {
        // Handle error, such as displaying an error message to the user
        console.error('Error updating information:', error);
        throw error; // Rethrow the error to handle it in the component
      });
    }
  }
  
  export default InformationService;
  