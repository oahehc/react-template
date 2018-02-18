import { log } from 'Utils/dev_func';

export const googleSignUp = () => {
  return new Promise((resolve, reject) => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const signOut = () => {
  return new Promise((resolve, reject) => {
    firebase.auth().signOut()
      .catch((err) => {
        reject(err);
      });
    resolve();
  });
};

export const authState = () => {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) resolve(user);
      resolve(null);
    });
  });
};
