const fetchData = async (url) =>
  fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    mode: 'cors'
  });

export const updateUserInformationRequest = async (values) =>
  fetch('https://api-gateway-k1nl.onrender.com/user', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    body: JSON.stringify(values)
  });

export const registerRequest = async (values) =>
  fetch('https://api-gateway-k1nl.onrender.com/user', {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    body: JSON.stringify(values)
  });

export const fetchUsersByUsername = async (username) =>
  fetchData(`https://api-gateway-k1nl.onrender.com/user/usernames?prefix=${username}`);

export const fetchUserByEmail = async (email) =>
  fetchData(`https://api-gateway-k1nl.onrender.com/user?email=${email}`);

export const fetchUserProfileByUsername = async (username) =>
  fetchData(`https://api-gateway-k1nl.onrender.com/user?username=${username}`);

export const fetchTrainingPlanByTitle = async (planTitle) =>
  fetchData(`https://api-gateway-k1nl.onrender.com/plan?title=${planTitle}`);
