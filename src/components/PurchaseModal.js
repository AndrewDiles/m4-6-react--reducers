import React, { useState, useEffect } from 'react';

import styled from 'styled-components';

// import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';

import CircularProgress from '@material-ui/core/CircularProgress';

import { BookingContext } from './BookingContext';
import { SeatContext } from './SeatContext';

export default function PurchaseModal() {
  const {
    state: { 
      selectedSeatId, 
      price, 
      status
    },
    actions: { 
      removeSelectedInfo,
      endBookingProcess, 
      purchaseRequest, 
      purchaseSuccess, 
      purchaseFailure 
    },
  } = React.useContext(BookingContext);

  const {
    actions: { seatPurchased },
  } = React.useContext(SeatContext);

  const [creditCardNumber, setCreditCard] = useState('');
  const [creditCardExpiration, setExpiration] = useState('');
  // const [open, setOpen] = useState(false);
  // const [selectedSeatId, setSelectedSeatId] = React.useState(null);



  // const handleClickOpen = (ev) => {
  //   // setSelectedSeatId(ev.target.seatId);
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   // setSelectedSeatId(null);
  //   setOpen(false);
  // };

  console.log('selectedSeatId: ', selectedSeatId);

  let row;
  let number;
  if (selectedSeatId) {
    row = selectedSeatId[0];
    if (selectedSeatId.length === 4){
      number = `${selectedSeatId[2]}${selectedSeatId[3]}`
    }
    else number = selectedSeatId[2];
  };

  // const modalTarget = document.getElementById("purchaseModal");
  // console.log('stay on target', modalTarget);


  // document.addEventListener('click', function(event) {
  //   if (selectedSeatId === null) return;
  //   console.log(event);
  //   console.log(event.target);
  //   const modalTarget = document.getElementById("purchaseModal");
  //   if (event.target.id != 'purchaseModal' || modalTarget.contains(event.target)) {
  //     removeSelectedInfo();
  //   }
  // });


  // function clickOffModal (event) {
  //   if (selectedSeatId === null) return;
  //   console.log(event);
  //   console.log(event.target);
  //   const modalTarget = document.getElementById("purchaseModal");
  //   if (event.target.id != 'purchaseModal' || modalTarget.contains(event.target)) {
  //     removeSelectedInfo();
  //   }
  // }

  // useEffect(() => {
  //   document.addEventListener('click', function(event){
  //     // if (selectedSeatId === null || selectedSeatId === undefined) return;
  //     // console.log(event);
  //     // console.log(event.target);
  //     // const modalTarget = document.getElementById("purchaseModal");
  //     // console.log('ssid != null', selectedSeatId != null);
  //     // console.log((`e tar is modal, ${event.target.id != 'purchaseModal'}`);
  //     // console.log('modtargt contiains e tar', modalTarget.contains(event.target));
  //     console.log('status:', status);
  //     if (status === 'purchased'){      
  //         console.log('going to remove');  
  //         removeSelectedInfo();
  //         console.log('status post function', status);
  //     }
  //   });

  //   return () => {
  //     document.removeEventListener('click', function(event){
  //       // if (selectedSeatId === null || selectedSeatId === undefined) return;
  //       // console.log(event);
  //       // console.log(event.target);
  //       // const modalTarget = document.getElementById("purchaseModal");
  //       // console.log('ssid != null', selectedSeatId != null);
  //       // console.log((`e tar is modal, ${event.target.id != 'purchaseModal'}`);
  //       // console.log('modtargt contiains e tar', modalTarget.contains(event.target));
  //       console.log('status:', status);
  //       if (status === 'purchased'){    
  //           console.log('going to remove');  
  //           removeSelectedInfo();
  //           console.log('status post function', status);
  //       }
  //     });
  //   };
  // }, [status]);


  // document.addEventListener('click', function(event){
  //   if (selectedSeatId === null || selectedSeatId === undefined) return;
  //   // console.log(event);
  //   // console.log(event.target);
  //   const modalTarget = document.getElementById("purchaseModal");
  //   console.log('ssid != null', selectedSeatId != null);
  //   // console.log((`e tar is modal, ${event.target.id != 'purchaseModal'}`);
  //   console.log('modtargt contiains e tar', modalTarget.contains(event.target));
  //   if (selectedSeatId != null && (event.target.id != 'purchaseModal' || modalTarget.contains(event.target))) {
  //     removeSelectedInfo();
  //     console.log('bing');
  //   }
  // });

useEffect(() => {
    document.addEventListener('keydown', function(event){  
      if (event.key === 'Escape'){
        removeSelectedInfo();
      }
    });

    return () => {
      document.removeEventListener('keydown', function(event){
        if (event.key === 'Escape'){
          removeSelectedInfo();
        }
      });
    };
  }, []);

  return (
    <Dialog
      open = {!!selectedSeatId}
      // open = {selectedSeatId !== undefined}
    >
    {/* <CircularProgress 
      open = {status != 'idle'}
    /> */}
      <ModalBox
      id = 'purchaseModal'
      >
        <ExitButton onClick={ endBookingProcess }>
          X
        </ExitButton>
        <PrimaryText>Purchase Ticket</PrimaryText>
        <SecondaryText>You're purchasing 1 ticket for the price of ${price} </SecondaryText>
        <SeatInfoDiv>
          <SecondaryText>
            Row
          </SecondaryText>
          <SecondaryText>
            Seat
          </SecondaryText>
          <SecondaryText>
            Price
          </SecondaryText>
        </SeatInfoDiv>
        <SeatInfoDiv>
          <SecondaryText>
            {row}
          </SecondaryText>
          <SecondaryText>
            {number}
          </SecondaryText>
          <SecondaryText>
            {price}
          </SecondaryText>
        </SeatInfoDiv>
        <PaymentArea>
          <PaymentText>
            Enter payment details
          </PaymentText>
          <form
            onSubmit={ev => {
              ev.preventDefault();
              purchaseRequest();
              fetch('/api/book-seat', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  creditCard: creditCardNumber,
                  expiration: creditCardExpiration,
                  seatId: selectedSeatId,
                }),
              })
                .then(res => res.json())
                .then(json => {
                  if (json.success) {
                    console.log('You did done gud A-Aron');

                    purchaseSuccess();
                    // seatPurchased();
                    seatPurchased({seatId: selectedSeatId});
                  } 
                  else {
                    purchaseFailure(json.message);
                  }
                })
                .catch(err => {
                  console.error(err);
                  purchaseFailure('An unknown error has occurred');
                });
            }}
          >
            <PaymentInfo>
              <TextField
                autoFocus
                id = "ccn"
                label = "Credit card"
                type = "creditCardNumber"
                value = {creditCardNumber}
                onChange = {ev => setCreditCard(ev.currentTarget.value)}
              />     
              <TextField
                id="exp"
                label="Expiration"
                type="creditCardExpiration"
                value = {creditCardExpiration}
                onChange = {ev => setExpiration(ev.currentTarget.value)}
              />
              <PurchaseButton 
                type = "submit"
                // onClick={ purchaseRequest }
                // onClick={() => { purchaseRequest() }}
              >
                {status === 'awaiting-response-from-server' ? (
                  <CircularProgress/>
                ) : (
                  "Purchase"
                )}
              </PurchaseButton>
            </PaymentInfo>
          </form>
        </PaymentArea>
      </ModalBox>
    </Dialog>
  );
}

const ModalBox = styled.div`
  width: 30vw;
`
const PrimaryText = styled.p`
  font-size: 3rem;
  font-weight: bold;
  margin: 35px 0;
  padding-left: 5%;
`
const ExitButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  &:hover {
    background-color: royalblue;
    color: white;
    transform: scale(1.2);
    cursor: pointer;
  }
`

const SecondaryText = styled.p`
  font-size: 1.35rem;
  margin-bottom: 25px;
  padding: 5%;
`

const SeatInfoDiv = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: solid lightgray 2px;
  width: 80%;
  margin: 10%;
  /* padding-left: 10%; */
`
const PaymentArea = styled.div`
  background-color: lightgray;
  padding: 10%;
`
const PaymentText = styled.span`
  font-weight: bold;
  font-size: 1.6rem;
  padding: 25px;
`
const PaymentInfo = styled.span`
  display: flex;
  justify-content: space-between;
  /* gap: 20px; */
`

const PurchaseButton = styled.button`
  background-color: royalblue;
  color: white;
  text-align: center;
  border-radius: 10px;
  padding: 25px;
  &:hover {
    transform: scale(1.2);
    cursor: pointer;
    font-weight: bold;
  }
`