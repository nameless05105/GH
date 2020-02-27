export const login = user => (
  fetch("api/session", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json"
    }
  })
);

export const signup = user => (
  fetch("api/users", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json"
    }
  })
);

export const logout = () => (
  fetch("api/session", { method: "DELETE" })
);

export const checkLoggedIn = async () => {
  const response = await fetch('/api/session');
  const { user } = await response.json();
  let preloadedState = {};
  if (user) {
    preloadedState = {
      session: user
    };
  }
  const serialisedState = window.localStorage.getItem('app_state');

  // Passing undefined to createStore will result in our app getting the default state
  // If no data is saved, return undefined
  if (!serialisedState) return undefined;

  // De-serialise the saved state, and return it.
  // return JSON.parse(serialisedState);
  return preloadedState;
};

export const loadState = () => {
  try {
      // Load the data saved in localStorage, against the key 'app_state'
      const serialisedState = window.localStorage.getItem('app_state');

      // Passing undefined to createStore will result in our app getting the default state
      // If no data is saved, return undefined
      if (!serialisedState) return undefined;

      // De-serialise the saved state, and return it.
      return JSON.parse(serialisedState);
  } catch (err) {
      // Return undefined if localStorage is not available, 
      // or data could not be de-serialised, 
      // or there was some other error
      return undefined;
  }
};