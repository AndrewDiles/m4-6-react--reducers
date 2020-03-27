import React, { useContext } from 'react';
import styled from 'styled-components';

import seatAvailableImg from '../assets/seat-available.svg';
import { BookingContext } from './BookingContext';

const Seat = ({ seatId, seatStatus, price, seatIndex }) => {
  const {
    // selectedSeatId,
    actions: { beginBookingProcess }
  } = useContext(BookingContext);
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
  
    const SeatTag = () => {
    if (seatStatus === 'available') {
      // if (isBooked === false) {
      return (
        <ClrdImg onClick={() => { beginBookingProcess({ seatId, price }) }} status = {seatStatus} alt="a seat" src={seatAvailableImg} />
      );
    }
    else
      return (
        <BlkWhtImg alt="a seat" src={seatAvailableImg} />
      );
  }
    return (
      <SeatWrapper key={seatId}>
        <SeatButton 
        // onClick={() => { beginBookingProcess({ seatId, price }) }}
        /* onClick={handleClickOpen} */
        >
        <SeatTag/>
        <HiddenPopUp>
          Row {seatId[0]}, Seat {seatIndex+1} - ${price}
          <HiddenNotch>
          </HiddenNotch>
        </HiddenPopUp>
          
        </SeatButton>
      </SeatWrapper>
    )
};

const SeatWrapper = styled.div`
  position: relative;
  padding: 5px;
`;

const SeatButton = styled.button`
  cursor: pointer;
  /* &:hover > div {
    display : block;
  } */
`

const BlkWhtImg = styled.img`
  filter: grayscale(100%);
`

const ClrdImg = styled.img`
&:focus + div {
    display : block;
  }
&:hover + div {
  display : block;
}
`

const HiddenPopUp = styled.div`
  top: -15px;
  left: -35px;
  height: 30px;
  width: 150px; 
  display: none;
  position: absolute;
  z-index: 3;
  color: white;
  font-size: 0.7rem;
  align-content: center;
  text-align: center;
  justify-content: center;
  justify-items: center;
  background-color: rgba(50,50,50);
  /* opacity: 0; */
  transform: rotateY(0deg) rotate(360deg);
  &:hover {
    background-color: rgba(50,50,50);
  }
`
const HiddenNotch = styled.div`
  height: 15px;
  width: 15px;
  top: 20px;
  left: 65px;
  z-index: 0;
  background-color: rgba(50,50,50);
  transform: rotateY(0deg) rotate(45deg);
  position: absolute;
`

export default Seat;
