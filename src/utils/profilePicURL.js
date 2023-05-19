import { getDownloadURL, ref } from 'firebase/storage';

import { storage } from '../../firebaseConfig';

export default async function getProfilePicURL(username) {
  const cloudProfPicPath = 'profile-pics'.concat('/', username, '.jpg');
  const cloudProfilePicRef = ref(storage, cloudProfPicPath);

  try {
    const url = await getDownloadURL(cloudProfilePicRef);
    return url;
  } catch (error) {
    return null;
  }
}
