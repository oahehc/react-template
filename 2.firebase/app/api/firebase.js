import {log} from 'Utils/dev_func';

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

export const googleSignUp = () => {
  return new Promise((resolve, reject) => {
    const provider = new firebase
      .auth
      .GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        log('google signup success', result);
        resolve(result);
      })
      .catch((err) => {
        log('[ERROR] google signup', err);
        reject(err);
      });
  });
}