import { postDestination } from '../../utils/api.js';

export const addDestinationForm = () => {
  const form = document.getElementById('destinationForm'); // Use ID to get the form

  form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(form);

    const data = Object.fromEntries(formData.entries());

    try {
      const response = await postDestination(data);

      if (response.ok) {
        alert('Destination added successfully!');

        form.reset(); // Reset the form after successful submission
      } else {
        throw new Error('Failed to add destination');
      }
    } catch (error) {
      console.error(error);

      alert('Error adding destination. Please try again.');
    }
  });
};
