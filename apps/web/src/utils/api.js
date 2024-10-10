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

export async function postDestination(formData) {
  try {
    const response = await fetch(`${API_BASE_URL}/destinations`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Failed to create destination');
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function fetchTripById(id) {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/trips/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch trip details');
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const addDestinationToTrip = async (tripId, destinationId) => {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/trips/${tripId}/destinations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ destinationId }),
    });

    if (!response.ok) {
      throw new Error('Failed to add destination');
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding destination:', error);
    throw error;
  }
};

export const removeDestinationFromTrip = async (tripId, destinationId) => {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/trips/${tripId}/destinations/${destinationId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to remove destination');
    }

    return await response.json();
  } catch (error) {
    console.error('Error removing destination:', error);
    throw error;
  }
};
