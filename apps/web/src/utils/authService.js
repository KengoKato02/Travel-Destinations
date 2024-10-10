import { stringify } from 'safe-stable-stringify';

const { API_BASE_URL } = process.env;

export const signupUser = async (formObject) => {
  const response = await fetch(`${API_BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: stringify(formObject)
  });

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(errorData.message || 'Signup failed');
  }

  return response.json();
};

export const loginUser = async (formObject) => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: stringify(formObject)
  });

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(errorData.message || 'Login failed');
  }

  return response.json();
};
