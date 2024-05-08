
class InformationService {
    static addInformation(newData) {
      return fetch(`http://localhost:8080/iot/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)
      })
      .then(response => {
        if (!response.ok) {
            console.log('Failed to add new iot')
          throw new Error('Failed to add new iot');
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
      return fetch(`http://localhost:8080/iot/${itemId}`, {
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
  