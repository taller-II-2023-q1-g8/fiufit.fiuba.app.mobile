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

export const fetchTrainingPlanByID = async (planID) =>
  fetchData(`https://api-gateway-k1nl.onrender.com/plans/${planID}`);

export const fetchUserMetricsByUsername = async (username) =>
  fetchData(`https://api-gateway-k1nl.onrender.com/metrics?username=${username}`);

export const fetchUserGoalsByUsername = async (username) =>
  fetchData(`https://api-gateway-k1nl.onrender.com/goals?username=${username}`);

export const fetchGoalByID = async (goalID) =>
  fetchData(`https://api-gateway-k1nl.onrender.com/goals/${goalID}`);

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

export const createMetricRequest = async (values) =>
  fetch('https://api-gateway-k1nl.onrender.com/metrics', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    body: JSON.stringify(values)
  });

export const fetchCompletedPlanMetricsByUsername = async (username) =>
  fetch(
    `https://api-gateway-k1nl.onrender.com/metrics?
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
  fetchData(`https://api-gateway-k1nl.onrender.com/user/followed/${username}`);

export const fetchFollowerUsersByUsername = async (username) =>
  fetchData(`https://api-gateway-k1nl.onrender.com/user/follower/${username}`);

export const followUser = async (followerUsername, followedUsername) =>
  fetch(`https://api-gateway-k1nl.onrender.com/user/follow/${followerUsername}/${followedUsername}`, {
    method: 'POST'
  });

export const unfollowUser = async (followerUsername, followedUsername) =>
  fetch(`https://api-gateway-k1nl.onrender.com/user/follow/${followerUsername}/${followedUsername}`, {
    method: 'DELETE'
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
  fetchData(`https://fiufit-plans2.onrender.com/api/v1/trainers/username/usernames?prefix=${username}`);

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

// ejemplo de athleteId recibida:
// const athleteId = 2
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
