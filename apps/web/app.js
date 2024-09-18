document.addEventListener('DOMContentLoaded', () => {
    const messageElement = document.getElementById('message');
    
    fetch('http://localhost:3000/api')
        .then(response => response.json())
        .then(data => {
            messageElement.textContent = data.message;
        })
        .catch(error => {
            console.error('Error:', error);
            messageElement.textContent = 'Failed to fetch message from API';
        });
});
