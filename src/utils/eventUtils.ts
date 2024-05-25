

/**
 * Determines if a string is valid JSON.
 * @param {string} str - The string to be tested.
 * @returns {boolean} - True if the string is valid JSON, false otherwise.
 */
function processPublishEvents({channel, data}, cbFn) {
    try {
        if(data.eventType === "AGENT_STATE" && data.data.conversations.length >= 0) {
            cbFn(data);
        } else if (data.eventType === "CONVERSATION_STATE") {
            cbFn(data);
        } else {
            cbFn([]);
        }
    } catch (e) {
        cbFn([]);
    }
}


export {
    processPublishEvents
}