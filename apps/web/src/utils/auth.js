import { stringify } from 'safe-stable-stringify';

const SESSION_KEY = 'userSession';

const SESSION_DURATION = 3 * 60 * 60 * 1000; // 3 hours in milliseconds

export function setUserSession(email, username, token) {
  const session = {
    email,
    username,
    token,
    expiresAt: Date.now() + SESSION_DURATION
  };

  localStorage.setItem(SESSION_KEY, stringify(session));
}

export function getUserSession() {
  const sessionStr = localStorage.getItem(SESSION_KEY);

  if (!sessionStr) {return null;}

  const session = JSON.parse(sessionStr);

  if (Date.now() > session.expiresAt) {
    localStorage.removeItem(SESSION_KEY);

    return null;
  }

  return session;
}

export function clearUserSession() {
  localStorage.removeItem(SESSION_KEY);
}

export function isAuthenticated() {
  return getUserSession() !== null;
}

export function getAuthToken() {
  const session = getUserSession();

  return session ? session.token : null;
}
