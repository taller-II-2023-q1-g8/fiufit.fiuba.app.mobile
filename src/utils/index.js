import { getDownloadURL, ref } from 'firebase/storage';

import { storage } from '../../firebaseConfig';
import { fetchPlansByTrainerUsername } from '../requests';

export const isEmpty = (variable) => variable.length <= 0;

export const getProfilePicURL = async (username) => {
  const cloudProfPicPath = 'profile-pics'.concat('/', username, '.jpg');
  const cloudProfilePicRef = ref(storage, cloudProfPicPath);

  try {
    const url = await getDownloadURL(cloudProfilePicRef);
    return url;
  } catch (error) {
    return null;
  }
};

export const getPlanPicURL = async (planID) => {
  const cloudPlanPicPath = 'plan-pics'.concat('/', planID, '.jpg');
  const cloudPlanPicRef = ref(storage, cloudPlanPicPath);

  try {
    const url = await getDownloadURL(cloudPlanPicRef);
    return url;
  } catch (error) {
    return null;
  }
};

export async function processFetchedPlans(plans) {
  await plans.forEach((plan) => {
    const NO_CALIFICATION = 'No hay calificaciones';

    plan.athletes.forEach((athlete) => {
      athlete.username = athlete.external_id;

      if (athlete.calification_score === -1) {
        athlete.calification_score = NO_CALIFICATION;
      }

      if (athlete.calification === '') {
        athlete.calification = NO_CALIFICATION;
      }
    });

    plan.likes = plan.athletes.map((athlete) => athlete.is_liked).reduce((res, a) => res + a, 0);
    const califications = plan.athletes
      .map((athlete) => athlete.calification_score)
      .filter((e) => e !== NO_CALIFICATION);

    if (califications.length > 0) {
      plan.average_calification = califications.reduce((res, a) => res + a, 0) / califications.length;
    } else {
      plan.average_calification = NO_CALIFICATION;
    }

    plan.athletes_that_favorited = plan.athletes;
  });
}

// Function to generate a random integer between min and max (inclusive)
export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

export function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1); // deg2rad below
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}
