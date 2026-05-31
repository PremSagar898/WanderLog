const REQRES_BASE_URL = 'https://reqres.in/api';
const REQRES_API_KEY = import.meta.env.VITE_REQRES_API_KEY;

function createDemoToken(email, endpoint) {
  return btoa(`${endpoint}:${email}:${Date.now()}`);
}

function createDemoResponse(email, endpoint) {
  return {
    token: createDemoToken(email, endpoint),
  };
}

async function submitReqresAuth(endpoint, body) {
  if (!REQRES_API_KEY) {
    return createDemoResponse(body.email, endpoint);
  }

  const response = await fetch(`${REQRES_BASE_URL}/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': REQRES_API_KEY,
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error || 'Authentication failed. Please try again.');
  }

  return data;
}

export async function loginWithReqres(email, password) {
  return submitReqresAuth('login', { email, password });
}

export async function registerWithReqres(email, password) {
  return submitReqresAuth('register', { email, password });
}