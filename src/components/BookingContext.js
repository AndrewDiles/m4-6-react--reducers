import React, { useCallback } from 'react';

export const BookingContext = React.createContext();

const initialState = {
  status: 'idle',
  selectedSeatId: null,
  price: null,
  error: null,
};

function reducer(state, action) {
  console.log('action from reducer: ', action)
  switch (action.type) {
    case 'begin-booking-process': {
      return {
        ...state,
        status: 'awaiting-response',
        selectedSeatId: action.seatId,
        price: action.price,
      };
    }
    
    case 'purchase-request': {
      return {
        ...state,
        status: 'awaiting-response-from-server',
        error: null,
      };
    }
    case 'purchase-success': {
      return {
        ...state,
        status: 'purchased',
        selectedSeatId: null,
        price: null,
        error: null,
      };
    }

    case 'purchase-failure': {
      return {
        ...state,
        status: 'error',
        error: action.message,
      };
    }

    case 'end-booking-process': {
      return {
        ...state,
        status: 'idle',
        selectedSeatId: null,
        price: null,
      };
    }

    case 'remove-selected-info': {
      return {
        ...state,
        status: 'idle',
        selectedSeatId: null,
        price: null,
      };
    }

    default: {
      throw new Error(`Something went wrong with: ${action.type}`);
    }
  }
}

export const BookingProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const removeSelectedInfo = useCallback( ()  =>
    dispatch({
      type: 'remove-selected-info'
    }),
    [dispatch]
  );

  const beginBookingProcess = useCallback( ({seatId, price}) =>
    dispatch({
      type: 'begin-booking-process', seatId, price
    }),
    [dispatch]
  );

  const purchaseRequest = useCallback( () =>
    dispatch({
      type: 'purchase-request'
    }),
    [dispatch]
  );

  const purchaseSuccess = useCallback( () =>
    dispatch({
      type: 'purchase-success'
    }),
    [dispatch]
  );

  const purchaseFailure = useCallback( (message) =>
  dispatch({
    type: 'purchase-failure', message
  }),
  [dispatch]
);

const endBookingProcess = useCallback( () =>
  dispatch({
    type: 'end-booking-process'
  }),
  [dispatch]
);



  return (
    <BookingContext.Provider
      value={{
        state,
        actions: {
          removeSelectedInfo,
          beginBookingProcess,
          purchaseRequest,
          purchaseSuccess,
          purchaseFailure,
          endBookingProcess
        },
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};