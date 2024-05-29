// Function to get the base URL from window.location
const getBaseUrl = () => {
  const { protocol, hostname, port } = window.location;
  let baseUrl = `${protocol}//${hostname}`;
  // if (port && ((protocol === 'http:' && port !== '80') || (protocol === 'https:' && port !== '443'))) {
  //   baseUrl += `:${port}`;
  // }
  return baseUrl;
};

// const baseName = "helpdesk";
const baseName = process.env.BASE_APP

export { getBaseUrl, baseName} 