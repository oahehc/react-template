import {log} from 'Utils/dev_func';
// export const actionSignUp = () => { return new Promise((resolve, reject) => {
//     const provider = new firebase     .auth       .FacebookAuthProvider();
//  firebase       .auth() .signInWithPopup(provider)       .then((result) => {
//        log('fb signup success', result);         commit('mutationUser', {
//       uid: result.user.uid,           email: result.user.email,
// displayName: result.user.displayName         });         resolve(result);
//   }) .catch((err) => {         log('[ERR] fb signup', err);
// reject(err);     });   }); } import {   log, } from '@/js/function'; import
// PDFJS from 'pdfjs-dist'; export async function actionSignUp({   commit, }) {
//  return new Promise((resolve, reject) => {       const provider = new
// firebase.auth.FacebookAuthProvider();
// firebase.auth().signInWithPopup(provider).then((result) => { log('fb signup
// success', result);           commit('mutationUser', {      uid:
// result.user.uid,               email: result.user.email,    displayName:
// result.user.displayName,           }); resolve(result);       }).catch((err)
// => {           log('[ERR] fb signup', err);           reject(err);       });
//  }); } export async function actionGoogleSignUp({   commit, }) {   return new
// Promise((resolve, reject) => {       const provider = new
// firebase.auth.GoogleAuthProvider();
// firebase.auth().signInWithPopup(provider).then((result) => { log('google
// signup success', result);           commit('mutationUser', {          uid:
// result.user.uid,               email: result.user.email,        displayName:
// result.user.displayName,           }); resolve(result);       }).catch((err)
// => {           log('[ERR] google signup', err);           reject(err);
// });   }); } export async function actionSignOut() {   return new
// Promise((resolve, reject) => { firebase.auth()           .signOut()
// .catch((err) => {  log('[ERR] signout', err);               reject(err);
//      }); resolve();   }); } export async function actionGetUserData() {
// return new Promise((resolve, reject) => {
// firebase.auth().onAuthStateChanged((user) => {           if (user) {
// firebase.database().ref(`users/${user.uid}`).once('value', (snapshot) => {
//                resolve(snapshot.val());               });           } else {
//              reject({                   code: '', message: 'account is not
// sign in',               });           }       }); }); } export async function
// actionGetLastSingIn() {   return new Promise((resolve, reject) => {
// firebase.auth().onAuthStateChanged((user) => {           if (user) {
// firebase.database().ref(`users/${user.uid}/lastSignIn`).once('value',
// (snapshot) => {                   resolve(snapshot.val());               });
//         } else {               reject({                   code: '',
// message: 'account is not sign in',               });           }   });   });
// } export async function actionGetProjectsData() {   return new
// Promise((resolve, reject) => { firebase.auth().onAuthStateChanged((user) => {
//           if (user) {
// firebase.database().ref(`users/${user.uid}/projects`).once('value',
// (snapshot) => {                   resolve(snapshot.val());               });
//         } else {               reject({                   code: '',
// message: 'account is not sign in',               });           }   });   });
// } export async function actionGetProjectData({   getters, commit, }, {
// projectId, }) {   return new Promise((resolve, reject) => {
// firebase.auth().onAuthStateChanged((user) => {           if (user) {
// firebase.database().ref(`users/${user.uid}/projects`).once('value',
// (snapshot) => {                   const projectObj =
// snapshot.val().reduce((result, obj) => {                       if
// (obj.projectId === projectId) result = obj;                       return
// result;                   }, '');                   if (projectObj) {
//       commit('mutationSelectProject', projectObj);    resolve(projectObj);
//                } else { reject({                           code: '', message:
// `no match project: ${projectId}`,                       });          }
//        });           } else {               reject({            code: '',
//               message: 'account is not sign in',           });           }
//    });   }); } export async function actionInitUserData({   getters, }) {
// return new Promise((resolve, reject) => {       const user = getters.getUser;
//       const userData = { account: user.email,           name:
// user.displayName,           lastSignIn: Date.now(),       };
// firebase.database().ref(`users/${user.uid}`)     .set(userData)
// .catch((err) => {               log('[ERR] actionInitUserData', err);
//       reject(err);           }); resolve();   }); } export async function
// actionUpdateLastSignIn({   getters, }) {   return new Promise((resolve,
// reject) => {       const user = getters.getUser;       const now =
// Date.now(); firebase.database().ref(`users/${user.uid}/lastSignIn`)
// .set(now)         .catch((err) => {               log('[ERR]
// actionUpdateLastSignIn', err);               reject(err);           });
// resolve();   }); } export async function actionUpdateProjects({   getters, },
// {   projectArray, }) {   return new Promise((resolve, reject) => {
// const user = getters.getUser;       // tool for add additional attribute
//  // projectArray.forEach((projectObj) => {       //     if
// (!projectObj.hasOwnProperty('countDownBeats')) projectObj.countDownBeats = 4;
//       // });       firebase.database().ref(`users/${user.uid}/projects`)
// .set(projectArray)           .catch((err) => {               log('[ERR]
// actionUpdateProjects', err);               reject(err);           });
// resolve();   }); } export async function actionUpdateSingleProject({ commit,
//  getters, }, {   newProjectObj, }) {   return new Promise((resolve, reject)
// => {       commit('mutationSelectProject', newProjectObj); const user =
// getters.getUser;
// firebase.database().ref(`users/${user.uid}/projects`).once('value',
// (snapshot) => {           let projectArray = snapshot.val();
// projectArray = projectArray.map((oriProjectObj) => {               if
// (oriProjectObj.projectId === newProjectObj.projectId) return newProjectObj;
//           return oriProjectObj;           });
// log('actionUpdateSingleProject', projectArray);
// firebase.database().ref(`users/${user.uid}/projects`) .set(projectArray)
//          .catch((err) => { log('[ERR] actionUpdateSingleProject', err);
//             reject(err);             });           resolve();       });   });
// } export async function actionDeleteFile({   getters, }, {   projectId,
// file, }) {   return new Promise((resolve, reject) => {
// log('actionDeleteFile', file); const user = getters.getUser;
// firebase.storage().ref().child(`${user.uid}/${projectId}/${file}`) .delete()
//          .then(() => resolve())           .catch((err) => {        log('[ERR]
// actionDeleteFile', err);               reject(err);   });   }); } function
// getSingleImageUrl({   uid,   projectId,   img, }) { return new
// Promise((resolve, reject) => {
// firebase.storage().ref().child(`${uid}/${projectId}/${img}`).getDownloadURL()
//           .then((url) => {               resolve(url); }).catch((err) => {
//            log('[ERR] getSingleImageUrl', err);        resolve(null);
//   });   }); } export async function actionGetImageUrls({   getters, }, {
// fileArray, }) {   return new Promise((resolve, reject) => {
// log('actionGetImageUrls', fileArray);    const user = getters.getUser;
// const project = getters.getSelectProject;       const promiseArray =
// fileArray.map((img) => {           // return
// firebase.storage().ref().child(`${user.uid}/${project.projectId}/${img}`).get
// D ownloadURL();           return getSingleImageUrl({               uid:
// user.uid,               projectId: project.projectId,               img,
// });       });       Promise.all(promiseArray).then((urlArray) => {
// resolve(urlArray);       }).catch((err) => {           log('[ERR]
// actionGetImageUrls', err);           reject(err);       });   }); } export
// async function actionGetSingleImageUrl({   getters, }, {   fileName, }) {
// return new Promise((resolve, reject) => {       const user = getters.getUser;
//       const project = getters.getSelectProject;
// firebase.storage().ref().child(`${user.uid}/${project.projectId}/${fileName}`
// ) .getDownloadURL()           .then((url) => {               resolve(url);
//   })           .catch((err) => {               log('[ERR]
// actionGetSingleImageUrl', err);               reject(err);           }); });
// } export async function actionUploadFile({   commit,   getters, }, { file,
// index, }) {   return new Promise((resolve, reject) => {       const user =
// getters.getUser;       const project = getters.getSelectProject; const
// progressArray = getters.getProgressArray;       const fileName =
// `${Date.now()}${index}.${file.type.replace(/.*\//, '')}`;
// firebase.storage().ref()
// .child(`${user.uid}/${project.projectId}/${fileName}`)           .put(file)
//       .on('state_changed', (snapshot) => { progressArray[index] =
// Math.ceil((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
//     const value = progressArray.reduce((sum, val) => {                   sum
// += val;        return sum;               }, 0) / progressArray.length;
// commit('mutationProgressArray', progressArray); commit('mutationProgress',
// value);               // switch (snapshot.state) {               //     case
// firebase.storage.TaskState.PAUSED: // or 'paused'             //
// log('Upload is paused');               // break;               //     case
// firebase.storage.TaskState.RUNNING: // or 'running'               //
// log('Upload is running');               //         break;               // }
//          }, (err) => { log('[ERR] actionUploadFile', err);
// reject(err);           }, () => {               resolve([fileName]);
//  });   }); } export async function actionUploadFileByBase64({   commit,
// getters, }, {   base64, fileName,   index, }) {
// log('actionUploadFileByBase64', fileName, index); return new
// Promise((resolve, reject) => {       const user = getters.getUser;
// const project = getters.getSelectProject;       const progressArray =
// getters.getProgressArray;       firebase.storage().ref()
// .child(`${user.uid}/${project.projectId}/${fileName}`) .putString(base64,
// 'base64')           .on('state_changed', (snapshot) => {
// progressArray[index] = Math.ceil((snapshot.bytesTransferred /
// snapshot.totalBytes) * 100);               const value =
// progressArray.reduce((sum, val) => {                   sum += val;
// return sum;               }, 0) / progressArray.length;
// commit('mutationProgressArray', progressArray); commit('mutationProgress',
// value);           }, (err) => { log('[ERR] actionUploadFileByBase64', err);
//             reject(err);    }, () => {               resolve();           });
//   }); } export async function actionUploadPdfFile({   commit,   getters, }, {
//   file,   index, }) {   log('actionUploadPdfFile', file, index);   return new
// Promise((resolve, reject) => {       const user = getters.getUser;
// const progressArray = getters.getProgressArray;
// firebase.storage().ref() .child(`${user.uid}/temp${index}.pdf`)
// .put(file) .on('state_changed', (snapshot) => {
// progressArray[0] = Math.ceil((snapshot.bytesTransferred /
// snapshot.totalBytes) * 100);     const value = progressArray.reduce((sum,
// val) => {                   sum += val;                   return sum;
//       }, 0) / progressArray.length;
// commit('mutationProgressArray', progressArray);
// commit('mutationProgress', value);           }, (err) => {
// log('[ERR] actionUploadPdfFile', err); reject(err);           }, () => {
// firebase.storage().ref().child(`${user.uid}/temp${index}.pdf`).getDownloadURL
// ( )                   .then((url) => { PDFJS.disableWorker = true;
// PDFJS.getDocument(url).then((pdf) => {                           const
// imageArray = [];                           let uploadPage = 0;            for
// (let i = 0; i < pdf.numPages; i += 1) {        const fileName =
// `${Date.now()}${index}${i}.png`;          imageArray.push(fileName);
// pdf.getPage(i + 1).then((page) => {                                   const
// scale = 1.5;                                   const viewport =
// page.getViewport(scale);                                   const canvas =
// document.createElement('canvas');                                   const
// context = canvas.getContext('2d'); canvas.height = viewport.height;
// canvas.width = viewport.width; page.render({
//      canvasContext: context,                                     viewport,
// }).then(() => { actionUploadFileByBase64({
//        commit,                                          getters,           },
// {                                           fileName,
//        base64: canvas.toDataURL().substr(22),
//   index: 0,     }).then(() => {
// uploadPage += 1;                                           if (uploadPage ===
// pdf.numPages) resolve(imageArray);                                       });
//                   });                               });      }
//        });                   }) .catch((err) => {
// log('[ERR] actionUploadPdfFile', err);                       reject(err);
//               });           });  }); }