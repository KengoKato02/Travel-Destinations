document.addEventListener('DOMContentLoaded', async () => {
  const messageElement = document.getElementById('message');

  /* eslint-disable sonarjs/no-commented-code */
  // const apiBaseUrl = process.env.API_BASE_URL || 'http://localhost:3000';
  const apiBaseUrl = 'http://localhost:3000/api';
  /* eslint-enable sonarjs/no-commented-code */

  try {
    const response = await fetch(apiBaseUrl);
    const data = await response.json();
    messageElement.textContent = data.message;
  } catch (error) {
    messageElement.textContent = `Failed to fetch message from API with error: ${error}`;
  }
});
