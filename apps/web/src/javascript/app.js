import '../styles/styles.css';

// eslint-disable-next-line import-x/extensions
import { fetchMessage } from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const message = await fetchMessage();
    /* eslint-disable no-console */
    console.log(message);
    /* eslint-enable no-console */
  } catch (error) {
    throw new Error(`Failed to fetch message with ${error.message}`);
  }
});
