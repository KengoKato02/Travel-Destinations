document.addEventListener('DOMContentLoaded', async () => {
  const messageElement = document.getElementById('message');

  try {
    const response = await fetch('http://localhost:3000/api');
    const data = await response.json();
    messageElement.textContent = data.message;
  } catch (error) {
    messageElement.textContent = `Failed to fetch message from API with error: ${error}`;
  }
});
