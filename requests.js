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
  fetch(`https://api-gateway-k1nl.onrender.com/user/usernames?prefix=${username}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    mode: 'cors'
  });

export const fetchUserByEmail = async (email) =>
  fetch(`https://api-gateway-k1nl.onrender.com/user?email=${email}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    mode: 'cors'
  });
