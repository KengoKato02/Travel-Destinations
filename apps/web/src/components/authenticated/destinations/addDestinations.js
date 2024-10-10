import { postDestination } from '../../../utils/api.js';

export const addDestinationForm = () => {
  const form = document.getElementById('destinationForm');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    try {
      const response = await postDestination(formData);

      if (response) {
        alert('Destination added successfully!');
        form.reset();
      } else {
        throw new Error('Failed to add destination');
      }
    } catch (error) {
      console.error(error);
      alert('Error adding destination. Please try again.');
    }
  });
};
