import React
// , { useEffect } 
from 'react';
import styled from 'styled-components';

// import seatAvailableImg from '../assets/seat-available.svg'
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { BookingContext } from './BookingContext';
import { SeatContext } from './SeatContext';
import Seat from './Seat';

import { getRowName, getSeatNum } from '../helpers';
import { range } from '../utils';

const TicketWidget = ({ numOfRows, seatsPerRow, seats }) => {
  const {
    state: { 
      status
    },
    actions: { 
      removeSelectedInfo
    //   endBookingProcess, 
    //   purchaseRequest, 
    //   purchaseSuccess, 
    //   purchaseFailure 
    },
  } = React.useContext(BookingContext);

  // const {
  //   actions: { seatPurchased },
  // } = React.useContext(SeatContext);


  console.log('seats:', seats)
  console.log('status: ', status);

  // console.log('data in widget:', data);
  // console.log ('seats in widget: ', seats)

  // const numOfRows = 8;
  // const seatsPerRow = 12;
  // if (numOfRows === 0) numOfRows = 8;
  // if (seatsPerRow === 0) numOfRows = 12;

  // const SeatTaken = () => {
  //   return (
  //     <SeatButton>
  //       <BlkWhtImg alt="a seat" src={seatAvailableImg} />
  //     </SeatButton>
  //   );
  // }
  // const SeatEmpty = () => {
  //   return (
  //     <SeatButton>
  //       <img alt="a seat" src={seatAvailableImg} />
  //     </SeatButton>
  //   );
  // }
  // function clearStatus () {
  //   removeSelectedInfo();
  //   return;
  // }

  // const modalTarget = document.getElementById('purchaseModal');
  // modalTarget.addEventListener('click', function(event) {
  //   console.log(event);
  //   console.log(event.target);
  //   // removeSelectedInfo();
  // });

  if (numOfRows === 0)
    return (
      <ProgressWrapper>
        <CircularProgress />
      </ProgressWrapper>
    )
    
  else
    return (
      <Wrapper>
        
          <Snackbar open={status === 'purchased'} autoHideDuration={6000} severity="success" onClick={
            // seatPurchased, 
            removeSelectedInfo}
        // onClose={handleClose}
        >
          <Alert 
          // onClose={handleClose} 
          severity="success">
            Party on Wayne!
            </Alert>
        </Snackbar>
        {range(numOfRows).map(rowIndex => {
          const rowName = getRowName(rowIndex);
          return (
            <Row key={rowIndex}>
              <RowLabel>Row {rowName}</RowLabel>
              {range(seatsPerRow).map(seatIndex => {
                const seatId = `${rowName}-${getSeatNum(seatIndex)}`;
                return (
                  <Seat
                  key = {seatId}
                  seatIndex = {seatIndex}
                  price = {seats[seatId].price}
                  seatId = {seatId}
                  seatStatus = {seats[seatId].isBooked ? 'unavailable' : 'available'}
                  >
                  </Seat>
                )
              })}
            </Row>
          );
        })}
      </Wrapper>
    );
};
const ProgressWrapper = styled.div`
  width: 500px;
  height: 500px;
`
const Wrapper = styled.div`
  background: #eee;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 8px;
  margin: 25px;
`;

const Row = styled.div`
  display: flex;
  position: relative;

  &:not(:last-of-type) {
    border-bottom: 1px solid #ddd;
  }
`;

const RowLabel = styled.div`
  font-weight: bold;
`;

const SeatWrapper = styled.div`
  padding: 5px;
`;

const SeatButton = styled.button`
  cursor: pointer;
`

const BlkWhtImg = styled.img`
  filter: grayscale(100%);
`


export default TicketWidget;
