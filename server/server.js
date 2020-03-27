const express = require('express');

const PORT = 5678;

var app = express();

app.use(express.json());

app.use(require('./routes'));

// import routes from (./routes)
app.use(require('./routes'));

// const handleGetSeatAvailability = async (req, res) => {

// }

const handleBookSeat = async (req, res) => {
  console.log('req:', req);
  console.log('res:', res);

//   json
// {
//   "seatId": "A-3",
//   "creditCard": "1234123412341234",
//   "expiration": "12/34"
// }
  res.send('okay, we got it')
}

express() 
  // .get('/api/seat-availability', handleGetSeatAvailability)
  .post('/api/book-seat', handleBookSeat)

const server = app.listen(PORT, function() {
  console.info('🌍 Listening on port ' + server.address().port);
});




/**
  Endpoints related to feeds (ordered sets of tweets)
*/
// const router = require('express').Router();
// const { delay } = require('./helpers');

// const NUM_OF_ROWS = 8;
// const SEATS_PER_ROW = 12;

// let state;

// router.get('/api/seat-availability', (req, res) => {
//   if (!state) {
//     state = {
//       bookedSeats: randomlyBookSeats(30),
//     };
//   }

//   return res.json({
//     bookedSeats: state.bookedSeats,
//     numOfRows: NUM_OF_ROWS,
//     seatsPerRow: SEATS_PER_ROW,
//   });
// });

// let lastBookingAttemptSucceeded = false;

// router.post('/api/book-seat', async (req, res) => {
//   const { seatId, creditCard, expiration } = req.body;

//   if (!state) {
//     state = {
//       bookedSeats: randomlyBookSeats(30),
//     };
//   }

//   const isAlreadyBooked = !!state.bookedSeats[seatId];

//   await delay(Math.random() * 3000);

//   if (!creditCard || !expiration) {
//     return res.status(400).json({
//       message: 'Please provide credit card information!',
//     });
//   }

//   if (isAlreadyBooked) {
//     return res.status(400).json({
//       message: 'This seat has already been booked!',
//     });
//   }

//   if (lastBookingAttemptSucceeded) {
//     lastBookingAttemptSucceeded = !lastBookingAttemptSucceeded;

//     return res.status(500).json({
//       message: 'An unknown error has occurred. Please try your request again.',
//     });
//   }

//   lastBookingAttemptSucceeded = !lastBookingAttemptSucceeded;

//   state.bookedSeats[seatId] = true;

//   return res.json({
//     success: true,
//   });
// });

// //////// HELPERS
// const getRowName = rowIndex => {
//   return String.fromCharCode(65 + rowIndex);
// };

// // const getRowIndex = rowName => {
// //   return rowName.charCodeAt(0) - 65;
// // };

// const randomlyBookSeats = num => {
//   const bookedSeats = {};

//   while (num > 0) {
//     const row = Math.floor(Math.random() * NUM_OF_ROWS);
//     const seat = Math.floor(Math.random() * SEATS_PER_ROW);

//     const seatId = `${getRowName(row)}-${seat + 1}`;

//     bookedSeats[seatId] = true;

//     num--;
//   }

//   return bookedSeats;
// };

// module.exports = router;
