import { getDownloadURL, ref } from 'firebase/storage';

import { storage } from '../firebaseConfig';

export default async function getProfilePicURL(username) {
  const cloudProfPicPath = 'profile-pics'.concat('/', username, '.jpg');
  const cloudProfilePicRef = ref(storage, cloudProfPicPath);
  console.log('asta', cloudProfilePicRef.fullPath);
  console.log(cloudProfilePicRef.name);
  console.log(cloudProfilePicRef.bucket);
  try {
    const url = await getDownloadURL(cloudProfilePicRef);
    console.log('Profile Pic URL:', url);
    return url;
  } catch (error) {
    console.log("Couldn't fetch profile pic for User:", error);
    return null;
  }
}
