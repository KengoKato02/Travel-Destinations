import '../styles/styles.css';

// eslint-disable-next-line import-x/extensions
import { fetchMessage } from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const message = await fetchMessage();
    console.log(message);
  } catch (error) {
    throw new Error(`Failed to fetch message with ${error.message}`);
  }
});
