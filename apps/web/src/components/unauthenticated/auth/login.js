import { stringify } from 'safe-stable-stringify';

export function initLogin() {
  const loginForm = document.getElementById('loginForm');

  if (!loginForm) {
    console.error('Login form not found');

    return;
  }

  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(loginForm);

    console.log('Form data:', Object.fromEntries(formData));

    const formObject = Object.fromEntries(formData);

    try {
      const response = await fetch('http://localhost:3000/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: stringify(formObject)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      localStorage.setItem('jwt', data.token);

      alert('Login successful');

      window.location.href = '/authenticated/destinations';
    } catch (error) {
      console.error('Error during login:', error);

      alert('Login failed. Please check your credentials and try again.');
    }
  });
}
