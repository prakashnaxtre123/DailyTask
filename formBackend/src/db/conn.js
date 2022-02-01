const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/students-Registration",{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("Connection is sucessful");
}).catch((e)=>{
    console.log("No connection" +e);
})
/* const mysql= require('mysql');
const conn = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    port:"3306",
    database:"demo",
    driver:"mysql"
});
conn.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  }); */