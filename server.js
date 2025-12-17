const express = require('express');
const app = express();
const db = require('./db');

// or import 'dotenv/config' if you're using ES6
require('dotenv').config();


app.use(express.json());

app.get('/',(req, res)=>{
    res.send("Welcome to my hotel.... How can I help you ?")
})



//IMPORT routers FILES
const personRoutes = require('./routes/personRoutes');
//USE THE routers
app.use('/person',personRoutes);

const menuItemRoutes = require('./routes/menuItemRoutes');
app.use('/',menuItemRoutes) 


const PORT=process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log("server listening on port 3000")
})
