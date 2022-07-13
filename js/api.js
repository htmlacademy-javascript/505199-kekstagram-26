import { createAlertMessage } from './message-popup.js';

const API_ADDRESS = 'https://26.javascript.pages.academy/kekstagram';

// const getData = (onSuccess) => {
//   fetch(`${API_ADDRESS}/data`, { method: 'GET' })
//     .then((response) => {
//       if (response.ok) {
//         return response.json();
//       }
//       throw new Error(`${response.status} ${response.statusText}`);
//     })
//     .then((posts) => {
//       onSuccess(posts);
//     })
//     .catch(() => {
//       createAlertMessage();
//     });
// };

// const sendData = (formData, onSuccess, onError) => {
//   fetch(API_ADDRESS, { method: 'POST', body: formData })
//     .then((response) => {
//       if (response.ok) {
//         onSuccess();
//         return;
//       }
//       onError();
//     })
//     .catch(() => onError());
// };

const getData = async () => {
  let response;

  try {
    response = await fetch(`${API_ADDRESS}/data`, { method: 'GET' });

    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }
  } catch (error) {
    createAlertMessage();
    return [];
  }
  const data = await response.json();

  return data;
};

const sendData = async (formData, onSuccess, onError) => {
  let response;

  try {
    response = await fetch(API_ADDRESS, {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      onSuccess();
    } else {
      throw new Error(`${response.status} = ${response.statusText}`);
    }
  } catch (error) {
    onError();
  }
};

export { getData, sendData };
