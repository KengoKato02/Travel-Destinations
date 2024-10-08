import { stringify } from 'safe-stable-stringify';

const { API_BASE_URL } = process.env;

export async function fetchMessage() {
  try {
    const response = await fetch(`${API_BASE_URL}`);

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
    const response = await fetch(`${process.env.API_BASE_URL}/destinations`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch destinations');
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function fetchTrips() {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/trips`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch destinations');
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function fetchDestinationsById(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/destinations/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch destinations');
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function postDestination(destinationData) {
  try {
    const response = await fetch(`${API_BASE_URL}/destinations`, {
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
