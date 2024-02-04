const initialState = {
  personalDetails: {},
  addressDetails: {},
  users: [],
};

const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PERSONAL_DETAILS':
      return {
        ...state,
        personalDetails: action.payload,
      };
    case 'SET_ADDRESS_DETAILS':
      return {
        ...state,
        addressDetails: action.payload,
      };
    case 'ADD_USER':
      const newUser = {
        personalDetails: state.personalDetails,
        addressDetails: state.addressDetails,
      };
      return {
        ...state,
        users: [...state.users, newUser],
        personalDetails: {},
        addressDetails: {}, 
      };
    default:
      return state;
  }
};

export default formReducer;
