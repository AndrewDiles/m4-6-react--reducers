import React, { createContext } from 'react';

export const SeatContext = createContext();

const initialState = {
  hasLoaded: false,
  seats: null,
  numOfRows: 0,
  seatsPerRow: 0,
};

function reducer(state, action) {
  console.log('action from reducer: ', action)
  switch (action.type) {
    case 'receive-seat-info-from-server': {
      return {
        ...state,
        hasLoaded: true,
        seats: action.seats,
        numOfRows: action.numOfRows,
        seatsPerRow: action.seatsPerRow,
      };
    }
    case 'tell-server-seat-is-purchased': {
      return {
        ...state,
        seats: {
          ...state.seats,
          [action.seatId]: {
            ...state.seats[action.seatId],
            isBooked: true,
          }
        }
      };
    }
    default: {
      throw new Error(`Something went wrong with: ${action.type}`);
    }
  }
}

export const SeatProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const receiveSeatInfoFromServer = data => {
    dispatch({
      type: 'receive-seat-info-from-server',
      ...data,
    });
  };
  const seatPurchased = data => {
    dispatch({
      type: 'tell-server-seat-is-purchased',
      ...data,
    });
  };

  return (
    <SeatContext.Provider
      value={{
        state,
        actions: {
          receiveSeatInfoFromServer,
          seatPurchased
        },
      }}
    >
      {children}
    </SeatContext.Provider>
  );
};