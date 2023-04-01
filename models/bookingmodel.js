const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema({

    userName: {
        type: String, required: true
    },
    date: {
        type: String, required: true
    },
    startCity: {
        type: String, required: true
    },
    destination: {
        type: String, required: true
    },
    totalSeats: {
        type: String, required: true
    },
    passangerName:{
        type:String, required: true
    },
    seatNumber:{
        type:String, required: true
    },
    totalamount: {
        type: String, required: true
    },
    driverName:{
        type:String, required: true
    },
    driverNumber:{
        type:String, required: true
    },
    busNumber: {
        type: String, required: true
    },
    deptime:{
        type:String, required: true
    },
    arrTime:{
        type:String, required: true
    },
    transactionId:{
        type:String, required: true
    },

});

const booking = mongoose.model("booking", bookingSchema);

module.exports = booking;
