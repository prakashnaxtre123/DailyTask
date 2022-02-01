require('dotenv').config();
const express = require('express');
require("./db/conn");//include connectivity
const mongoose = require('mongoose');
const Student = require("./models/students");//include student schema
const TaskTable = require("./models/table_task");//include table_task schema
const bcrypt = require('bcryptjs');
const { response } = require('express');
//const { cookie } = require('express/lib/response');
const cookie=require("cookies");
const app = express();

/* const aboutMe = require("./routers/studentRouter");//include route file
app.use(aboutMe);//use route file */
const port = process.env.PORT || 3000;
app.use(function (req, res, next) {
    /*var err = new Error('Not Found');
     err.status = 404;
     next(err);*/
  
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
  
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');
  
  //  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
    // Pass to next layer of middleware
    next();
  });
//console.log(process.env.SECRET_KEY);
app.use(express.json());//to display incomming req object in JSON format
app.get("/", async(req, res)=> {
    console.log("here");
})

app.post("/students",async(req,res)=>{
    try{
        console.log("here");
        const user= new Student(req.body);
        const token =await user.generateAuthToken();
        console.log("jwt token is: "+token);
        res.cookie('rememberme', token, { expires: new Date(Date.now() + 900000), httpOnly: true });
        const createUser = await user.save();
        success={
            "msg":"success",
        }
        res.status(200).send(success);

    }catch(e){
        res.status(400).send(e);
    }
})


app.post("/login", async(req,res)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;  
        console.log("email: "+email);
        console.log("password: "+password);
        const useremail = await Student.findOne({email:email});
        const isMatch = await bcrypt.compare(password,useremail.password) ;
        const token =await useremail.generateAuthToken();
        console.log("jwt token is: "+token)
        if(isMatch){
            const success={
                "msg":"successful",
                "status":200
            }
            res.status(200).send(success);
            console.log("password matched");
        }
        else{
            res.status(400).send("failure");
            console.log("password mismatch");
        }
        
    }catch{
        res.status(400).send("Invalid credentials");
    }
})


app.post("/addTask",async(req,res)=>{
    try{

         console.log("task");
        const task= new TaskTable(req.body);
        const createTask = await task.save();
        console.log("task");
        res.status(201).send(createTask);
        //console.log(req.body);
        //console.log(createTask);
        

    }catch(e){
        res.status(400).send(e);
    }
})


app.get("/getTask", async(req,res)=>{
   try{
    const data = await TaskTable.find();
    res.status(200).send(data);
    console.log(data);
   }catch(err){
    res.status(400).send(err);
    console.log(err);
   }
})


app.patch("/updateTask",async(req,res)=>{
   try{
    const task=req.body.task;
    console.log(task);
    const comment=req.body.comment;
    console.log(comment);
    const _id= req.body._id;
    console.log(_id)
     const updateData = await TaskTable.updateOne({_id},{
        $set:{
            task:task,
            comment:comment,
        }
    })
    const success={
        "status":"sucess",
    }
    res.status(201).send(await TaskTable.find());
   }catch(err){
    res.status(401).send("failure");
    console.log(err);
   }
})


app.delete("/deleteTask",async(req,res)=>{
   try{
       console.log("hi")
       const _id=req.query;
       const deleteData = await TaskTable.deleteOne({_id});
        console.log(deleteData);  
        const success={
            "status":"sucess",
        }
        res.status(201).send(await TaskTable.find());
       // res.status(201).send(success);

   }
    catch(err){
        res.status(401).send("failure");
        console.log(err);
        }
})


app.listen(port,()=>{
    console.log(`server is listening at ${port}`);
})
