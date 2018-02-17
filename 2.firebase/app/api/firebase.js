import { log } from 'Utils/dev_func';

const userKey = 'USER_NAME';
const guess = 'GUESS';

export const googleSignUp = () => {
  return new Promise((resolve, reject) => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        log('google signup success', result);
        localStorage.setItem(userKey, result.user.displayName);
        resolve(result);
      })
      .catch((err) => {
        log('[ERROR] google signup', err);
        reject(err);
      });
  });
};

export const signOut = () => {
  return new Promise((resolve, reject) => {
    firebase.auth().signOut()
      .catch((err) => {
        log('[ERROR] signout', err);
        reject(err);
      });
    localStorage.removeItem(userKey);
    resolve();
  });
};

export const authCheck = () => {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((user) => {
      log('authCheck', user);
      if (user) resolve(true);
      resolve(false);
    });
  });
};

export const getUserName = () => {
  const userName = localStorage.getItem(userKey);
  if (userName) return userName;
  return guess;
};

/*
export const fbSignUp = () => {
  return new Promise((resolve, reject) => {
    const provider = new firebase
      .auth
      .FacebookAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        log('fb signup success', result);
        resolve(result);
      })
      .catch((err) => {
        log('[ERROR] fb signup', err);
        reject(err);
      });
  });
}
*/