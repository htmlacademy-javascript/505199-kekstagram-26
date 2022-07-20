import { createAlertMessage } from './message-popup.js';

const API_ADDRESS = 'https://26.javascript.pages.academy/kekstagram';

const getData = async (onSuccess) => {
  let response;

  try {
    response = await fetch(`${API_ADDRESS}/data`, { method: 'GET' });

    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }
  } catch (error) {
    createAlertMessage();
  }
  const data = await response.json();
  onSuccess(data);
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
      onError();
    }
  } catch (error) {
    onError();
  }
};

export { getData, sendData };
