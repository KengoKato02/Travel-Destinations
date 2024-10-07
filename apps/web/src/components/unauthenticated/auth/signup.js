import { stringify } from 'safe-stable-stringify';

export function initSignup() {
  const signupForm = document.getElementById('signupForm');

  if (!signupForm) {
    console.error('Signup form not found');

    return;
  }

  signupForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(signupForm);

    console.log('Form data:', Object.fromEntries(formData));

    const formObject = Object.fromEntries(formData);

    try {
      const response = await fetch('http://localhost:3000/api/v1/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: stringify(formObject)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }

      alert('Signup successful! Please log in.');

      window.location.href = '/login';
    } catch (error) {
      console.error('Error during signup:', error);

      alert('Signup failed. Please try again.');
    }
  });
}
