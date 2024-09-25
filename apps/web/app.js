import './styles.css';

document.addEventListener('DOMContentLoaded', async () => {
  const messageElement = document.getElementById('message');

  const apiBaseUrl = 'http://localhost:3000/api';

  try {
    const response = await fetch(apiBaseUrl);
    const data = await response.json();
    messageElement.textContent = data.message;
  } catch (error) {
    messageElement.textContent = `Failed to fetch message from API with error: ${error}`;
  }
});
