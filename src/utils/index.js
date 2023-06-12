import { getDownloadURL, ref } from 'firebase/storage';

import { storage } from '../../firebaseConfig';

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

// Function to generate a random integer between min and max (inclusive)
export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
