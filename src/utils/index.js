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
