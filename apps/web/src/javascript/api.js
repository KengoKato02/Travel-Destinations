// eslint-disable-next-line n/no-process-env
import { stringify } from 'safe-stable-stringify';

const { API_URL } = process.env;

export async function fetchMessage() {
  try {
    const response = await fetch(`${API_URL}`);
    if (!response.ok) {
      throw new Error('Failed to fetch message');
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function fetchDestinations() {
  try {
    const response = await fetch(`${API_URL}/destinations`);
    if (!response.ok) {
      throw new Error('Failed to fetch destinations');
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function createDestination(destinationData) {
  try {
    const response = await fetch(`${API_URL}/destinations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: stringify(destinationData)
    });
    if (!response.ok) {
      throw new Error('Failed to create destination');
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
}
