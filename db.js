const mongoose=require('mongoose');
// or import 'dotenv/config' if you're using ES6
require('dotenv').config();
// const mongoURL='mongodb://localhost:27017/hotels'
// const mongoURL='mongodb+srv://helloworld:Qwerty123@cluster0.qcde09u.mongodb.net/'

// const mongoURL=process.env.MONGODB_URL_LOCAL;
const mongoURL=process.env.MONGODB_URL;

mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

const db=mongoose.connection;


// When connected
db.on("connected", () => {
    console.log("MongoDB connection established successfully");
  });
  
  // When connection throws an error
  db.on("error", (err) => {
    console.log("MongoDB connection error:", err);
  });
  
  // When disconnected
  db.on("disconnected", () => {
    console.log("MongoDB disconnected");
  });

  // Optional: When Mongoose attempts reconnecting
db.on("reconnect", () => {
    console.log("MongoDB reconnected");
  });


  module.exports=db;




