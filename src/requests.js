const GATEWAY_URL = 'https://api-gateway-k1nl.onrender.com';

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
  fetch(`${GATEWAY_URL}/user`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    body: JSON.stringify(values)
  });

export const registerRequest = async (values) =>
  fetch(`${GATEWAY_URL}/user`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    body: JSON.stringify(values)
  });

export const fetchUsersByUsererrorTextname = async (username) =>
  fetchData(`${GATEWAY_URL}/user/usernames?prefix=${username}`);
export const fetchAllUsers = async () => fetchData(`${GATEWAY_URL}/user/`);
export const fetchUserByEmail = async (email) => fetchData(`${GATEWAY_URL}/user?email=${email}`);

export const fetchUserProfileByUsername = async (username) =>
  fetchData(`${GATEWAY_URL}/user?username=${username}`);

export const fetchTrainingPlanByID = async (planID) => fetchData(`${GATEWAY_URL}/plans/${planID}`);

export const fetchUserMetricsByUsername = async (username) =>
  fetchData(`${GATEWAY_URL}/metrics?username=${username}`);

export const fetchUserGoalsByUsername = async (username) =>
  fetchData(`${GATEWAY_URL}/goals?username=${username}`);

export const fetchGoalByID = async (goalID) => fetchData(`${GATEWAY_URL}/goals/${goalID}`);

export const createGoalRequest = async (values) =>
  fetch(`${GATEWAY_URL}/goals`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    body: JSON.stringify(values)
  });

export const createMetricRequest = async (values) =>
  fetch(`${GATEWAY_URL}/metrics`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    body: JSON.stringify(values)
  });

export const fetchPlans = async () => fetchData('https://fiufit-plans2.onrender.com/api/v1/plans');

export const fetchExercises = async () => fetchData('https://fiufit-plans2.onrender.com/api/v1/exercises');

export const deletePlan = async (planID) =>
  fetch(`https://fiufit-plans2.onrender.com/api/v1/plans/${planID}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    mode: 'cors'
  });

export const fetchPlanExercises = async (planID) =>
  fetchData(`https://fiufit-plans2.onrender.com/api/v1/plans/${planID}/exercises`);

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

export const editPlanRequest = async (values, planID) =>
  fetch(`https://fiufit-plans2.onrender.com/api/v1/plans/${planID}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    body: JSON.stringify(values)
  });

export const removeExerciseFromPlan = async (planID, exerciseID) =>
  fetch(`https://fiufit-plans2.onrender.com/api/v1/plans/${planID}/exercises/${exerciseID}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    mode: 'cors'
  });

export const fetchTrainerByUsername = async (username) =>
  fetchData(`https://fiufit-plans2.onrender.com/api/v1/trainers/usernames?prefix=${username}`);

export const fetchAthletePlansByID = async (athleteId) =>
  fetch('https://fiufit-plans2.onrender.com/api/v1/plans/search', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    body: JSON.stringify({
      athlete_id: athleteId
    })
  });

export const fetchAthletesID = async () => fetchData(`https://fiufit-plans2.onrender.com/api/v1/athletes`);

export const fetchTrainersID = async () => fetchData(`https://fiufit-plans2.onrender.com/api/v1/trainers`);

export const addPlanToAthleteAsFavorite = async (planID, athleteID) =>
  fetch(`https://fiufit-plans2.onrender.com/api/v1/plans/${planID}/athletes/${athleteID}`, {
    method: 'POST'
  });

export const removePlanToAthleteAsFavorite = async (planID, athleteID) =>
  fetch(`https://fiufit-plans2.onrender.com/api/v1/plans/${planID}/athletes/${athleteID}`, {
    method: 'DELETE'
  });

export const AddExcerciseToPlanRequest = async (planID, exerciseID, values) =>
  fetch(`https://fiufit-plans2.onrender.com/api/v1/plans/${planID}/exercises/${exerciseID}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    body: JSON.stringify(values)
  });

export const likePlan = async (planID, athleteID) =>
  fetch(`https://fiufit-plans2.onrender.com/api/v1/plans/${planID}/athletes/${athleteID}/likes`, {
    method: 'PATCH'
  });

export const calificatePlan = async (planID, athleteID, values) =>
  fetch(`https://fiufit-plans2.onrender.com/api/v1/plans/${planID}/athletes/${athleteID}/califications`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    body: JSON.stringify(values)
  });

export const fetchPlansByTrainerUsername = async (username) =>
  fetch('https://fiufit-plans2.onrender.com/api/v1/plans/search', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    body: JSON.stringify({ trainer_username: username })
  });

export const fetchPlansByTrainerID = async (id) =>
  fetch('https://fiufit-plans2.onrender.com/api/v1/plans/search', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    body: JSON.stringify(id)
  });

export const updateDeviceToken = async (username, token) =>
  fetch(`${GATEWAY_URL}/user/device/${username}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    body: JSON.stringify({ device_token: token })
  });

export const updateLoginTime = async (username) =>
  fetch(`${GATEWAY_URL}/user/login/${username}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    mode: 'cors'
  });

export const updateUserLocation = async (user) =>
  fetch(`${GATEWAY_URL}/user/coordinates/${user.username}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    body: JSON.stringify({
      longitude: user.longitude,
      latitude: user.latitude
    })
  });

export const fetchCompletedPlansByAthleteID = async (athleteId) =>
  fetch('https://fiufit-plans2.onrender.com/api/v1/plans/search', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    body: JSON.stringify({
      athlete_id: athleteId,
      is_completed: true
    })
  });

export const fetchCompletedPlanMetricsByUsername = async (username) =>
  fetch(
    `${GATEWAY_URL}/metrics?
username=${username}&type=training_plan_completed`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'cors'
    }
  );

export const fetchFollowedUsersByUsername = async (username) =>
  fetchData(`${GATEWAY_URL}/user/followed/${username}`);

export const fetchFollowerUsersByUsername = async (username) =>
  fetchData(`${GATEWAY_URL}/user/follower/${username}`);

export const followUser = async (followerUsername, followedUsername) =>
  fetch(`${GATEWAY_URL}/user/follow/${followerUsername}/${followedUsername}`, {
    method: 'POST'
  });

export const unfollowUser = async (followerUsername, followedUsername) =>
  fetch(`${GATEWAY_URL}/user/follow/${followerUsername}/${followedUsername}`, {
    method: 'DELETE'
  });

export const sendMessageNotification = async (sender, receiver, message) =>
  fetch(`${GATEWAY_URL}/messages/send`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    body: JSON.stringify({
      sender,
      receiver,
      message
    })
  });
