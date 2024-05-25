/**
 * Determines if a string is valid JSON.
 * @param {string} str - The string to be tested.
 * @returns {boolean} - True if the string is valid JSON, false otherwise.
 */
function isJSON(str) {
    try {
        JSON.parse(str);
        return true;
    } catch (e) {
        return false;
    }
}


function isValidApiResponse(response) {
    // Check if response is not null or undefined
    if (!response) {
      return false;
    }
  
    // Check if response status is in the range of 200 to 299 (indicating success)
    if (response.status < 200 || response.status >= 300) {
      return false;
    }
  
    // Check if response data is present
    if (!response.data) {
      return false;
    }
  
    // Add additional checks specific to your API response structure if needed
  
    return true;
  }
  
export default isValidApiResponse;

export {
    isJSON
}