// ClaimedSpotsContext.js
import React, { createContext, useReducer } from 'react';

const initialState = {
  spots: [],
};

const ClaimedSpotsContext = createContext();

const claimedSpotsReducer = (state, action) => {
  switch (action.type) {
    case 'CLAIM_SPOT':
      return {
        ...state,
        spots: state.spots.map(spot => {
          if (spot.id === action.payload.id) {
            return {
              ...spot,
              profilePic: action.payload.profilePic,
            };
          }
          return spot;
        }),
      };
    default:
      return state;
  }
};

const ClaimedSpotsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(claimedSpotsReducer, initialState);

  return (
    <ClaimedSpotsContext.Provider value={{ state, dispatch }}>
      {children}
    </ClaimedSpotsContext.Provider>
  );
};

export { ClaimedSpotsContext, ClaimedSpotsProvider };
