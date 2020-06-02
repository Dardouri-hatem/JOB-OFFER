const mongoose = require('mongoose');

const jobsShcema=mongoose.Schema({
name : {type : String,
        require : true},
telephone : {
    type : Number},
email : {type : String,
        require : true},
description :{
    type : String,
    require : true,
},
deadline : {
    type : String,
    require : true,
},       
postNumber : {
    type : Number,
    require : true
},
idEmp : {
    type : String,
    require : true,
},
date : {type : Date,
default : Date.now}
});


module.exports = mongoose.model('jobs',jobsShcema)