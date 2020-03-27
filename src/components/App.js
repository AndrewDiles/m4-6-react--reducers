import React, { useEffect, useContext } from 'react';

import GlobalStyles from './GlobalStyles';
import TicketWidget from './TicketWidget';
import PurchaseModal from './PurchaseModal';

import { SeatContext } from './SeatContext';

function App() {
  const {
    // state: { data },
    state: { seats, numOfRows, seatsPerRow },
    actions: { receiveSeatInfoFromServer },
  } = useContext(SeatContext);

  useEffect(() => {
    fetch('/api/seat-availability')
      .then(res => res.json())
      // .then(data => console.log(data));
      .then(data => receiveSeatInfoFromServer(data))
      // .then(data => console.log('data from useEffect:', data));
  }, []);

  return (
    <>
      <GlobalStyles />
      {/* This venue has {numOfRows} rows! */}
      <TicketWidget
        // data = {data}
        id = 'TicketWidget'
        numOfRows = { numOfRows }
        // receiveSeatInfoFromServer = {receiveSeatInfoFromServer}
        seatsPerRow = {seatsPerRow}
        seats = {seats}
        >
      </TicketWidget>
      <PurchaseModal/>
    </>
  );
}

export default App;
