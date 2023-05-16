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

export const fetchPlans = async () => fetchData('https://fiufit-plans2.onrender.com/api/v1/plans');

export const fetchUsersByUsername = async (username) =>
  fetchData(`https://api-gateway-k1nl.onrender.com/user/usernames?prefix=${username}`);

export const fetchUserByEmail = async (email) =>
  fetchData(`https://api-gateway-k1nl.onrender.com/user?email=${email}`);

export const fetchUserProfileByUsername = async (username) =>
  fetchData(`https://api-gateway-k1nl.onrender.com/user?username=${username}`);

export const fetchTrainingPlanByID = async (planID) =>
  fetchData(`https://api-gateway-k1nl.onrender.com/plans/${planID}`);

export const fetchUserMetricsByUsername = async (username) =>
  fetchData(`https://api-gateway-k1nl.onrender.com/metrics?username=${username}`);

export const fetchUserGoalsByUsername = async (username) =>
  fetchData(`https://api-gateway-k1nl.onrender.com/goals?username=${username}`);

export const createGoalRequest = async (values) =>
  fetch('https://api-gateway-k1nl.onrender.com/goals', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    body: JSON.stringify(values)
  });

export const createPlanRequest = async (values) =>
  fetch('https://fiufit-plans2.onrender.com/api/v1/plans', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    body: JSON.stringify(values)
  });
