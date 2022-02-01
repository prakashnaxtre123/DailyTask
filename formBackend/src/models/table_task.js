const mongoose = require('mongoose');
const validator = require('validator');
const taskSchema = new mongoose.Schema({ 
    task_id:{
        type: Number,
        required:true,
        minlength:3,
        unique:true
    },
    date:{
        type:String
    },
    task:{
        type:String,
        required:true,
        minlength:10,
    },
    comment:{
        type:String,
        required:true,
        minlength:10,
    },
})
// const TaskTable = new mongoose.model('TaskTable',taskSchema);
// module.exports = TaskTable;

module.exports = mongoose.model("TaskTable", taskSchema);