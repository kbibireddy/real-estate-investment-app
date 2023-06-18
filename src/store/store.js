import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { sampleData } from '../data/sampleApiData';
import { generateAmortization } from '../utils/amortization';

// Listing State
const initialListingState = {
  data: sampleData
}

function listingStateReducer(state = initialListingState, action) {
  switch (action.type) {
    case 'UPDATE_LISTING_DATA':
      return { ...state, data: {...state.data, [action.payload.key]: action.payload.value} };
    default:
      return state;
  }
  store.dispatch()
}

// App State

const initialAppState = {
  amortizationData: generateAmortization(sampleData)
};

function appStateReducer(state = initialAppState, action) {
  switch (action.type) {
    case 'UPDATE_AMORTIZATION_DATA':
      const newAmortizationData = generateAmortization(action.payload);
      return { ...state, amortizationData: newAmortizationData };
    default:
      return state;
  }
}

// Combine reducers 
const rootReducer = combineReducers({
  appState: appStateReducer,
  listingState: listingStateReducer
});

const store = configureStore({reducer: rootReducer});
// store.listingState.subscribe(() => {
//   const { listingState } = store.getState();
//   store.dispatch({
//     type: "UPDATE_AMORTIZATION_DATA",
//     payload: listingState.data
//   });
// })
export default store;

