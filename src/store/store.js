import { configureStore } from '@reduxjs/toolkit';
import { sampleData } from '../data/sampleApiData';


// Define an initial state for the store
const INITIAL_STATE = {
  apiData: sampleData,
  amortizedData: {}
};


// Define a reducer function to update the store based on actions
function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'UPDATE_DATA':
      return { ...state, data: action.payload };
    default:
      return state;
  }
}


// Create the Redux store
const store = configureStore({
  reducer: reducer
});


export default store;

