const mongoose = require ('mongoose')


const entrepreneur = mongoose.Schema({
    name: { type: String, require: true },
    practiceName: { type: String, require: true },
    speciality : { type: String, require: true },
    address:{ type: String, require: true },
    email: { type: String, require: true, unique: true },
    phone : {type : Number,require: true},
    password : {type : String, required: true},
    date :{type : Date ,default : Date.now}
})


module.exports=mongoose.model('Entrepreneurs',entrepreneur)