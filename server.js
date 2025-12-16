const express = require('express');
const app = express();
const db = require('./db');



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

app.listen(3000, ()=>{
    console.log("server listening on port 3000")
})
