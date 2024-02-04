export const submitPersonalDetails = (data) => ({
  type: 'SUBMIT_PERSONAL_DETAILS',
  payload: data,
});

export const submitAddressDetails = (data) => ({
  type: 'SUBMIT_ADDRESS_DETAILS',
  payload: data,
});


export const addUser = (userData) => ({
  type: 'ADD_USER',
  payload: userData,
});
