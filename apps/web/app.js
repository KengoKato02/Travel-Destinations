document.addEventListener('DOMContentLoaded', async () => {
  const messageElement = document.getElementById('message');

  /* eslint-disable n/no-process-env */
  const apiBaseUrl = process.env.API_BASE_URL;
  /* eslint-enable n/no-process-env */

  try {
    const response = await fetch(apiBaseUrl);
    const data = await response.json();
    messageElement.textContent = data.message;
  } catch (error) {
    messageElement.textContent = `Failed to fetch message from API with error: ${error}`;
  }
});
