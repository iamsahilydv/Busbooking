const express = require("express");
const mongoose = require("mongoose");
const nodemailer=require("nodemailer")


const bookingModel = require("../models/bookingmodel");

const bookingController = express.Router();

bookingController.post("/addbooking", async (req, res) => {
 try {
  const {userName, date, startCity, destination,totalSeats,
    passangerName,seatNumber,totalamount,driverName, driverNumber,
    busNumber,deptime, arrTime, transactionId } = req.body;


  const booking = new bookingModel({
    userName, date, startCity, destination, totalSeats, passangerName,
    seatNumber, totalamount, driverName, driverNumber, busNumber,
    deptime, arrTime, transactionId
  });
  await booking.save();
  const transporter = nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:587,
    secure:false,
    auth:{
        user:"quicktranstech@gmail.com",
        pass:"cqoyyqfmpyitwcka"
    }
})
const mail ={
    from:"quicktranstech@gmail.com",
    to:userName,
    subject:"Ticket confirmation",
    html:`<p><span><h3>Hi ${passangerName}</h3></span> <h4>Greetings from RydThru...</h4><h6> We are glad to have you onboard. The details of your journey are mentioned below... </h6> <h4>Congratulations!</h4>  <h5>Your ticket is booked from ${startCity} to ${destination}
    For ${date}.</h5><h5>For amount ${totalamount}</h5> for number of seats ${totalSeats} <h5>Your Departure time is ${deptime} and arrival at your destination at ${arrTime}</h5> 
    <h5>Passanger name : ${passangerName}</h5><h5>Seat no.: ${seatNumber}</h5> <h5>Bus Number:${busNumber}</h5> <h5> Your Driver name is ${driverName} and driver phone number is ${driverNumber}</h5><h5>transaction number is ${transactionId}</h5></p>`
}
await transporter.sendMail(mail)


  return res
    .status(200)
    .send({ status: 200, message: "booking register successfull",booking });

 } catch (error) {
      res.send(error)
 }
})

bookingController.get("/getbooking", async (req, res) => {
  const booking = await bookingModel.find();
  res.send(booking);
});

//update district by id
bookingController.put("/update/:id", async (req,res)=>{
  const id = req.params.id
  //const {id} = req.body;
  const rag = await bookingModel.findByIdAndUpdate( id ,
      {
        $set: req.body,
      },
      { new: true })
  res.status(200).send(rag)
}) 

//delete booking by id 

bookingController.delete("/delete/:id", async (req,res)=>{
  const id = req.params.id
 //const {id} = req.body;
 const booking = await bookingModel.findByIdAndRemove(id)
 res.send(booking)
}) 

module.exports = bookingController;
