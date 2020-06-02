const mongoose = require("mongoose");

const appointment = mongoose.Schema({
  patientName: { type: String, require: true },
  phone: { type: String , require: true },
  patientId: {
    type: String,
    require: true,
  },
  idEmp: { type: String, require: true },
  date: { type:String ,require:true },
  time : {type:String, require:true},
  confirmation: { type: String, require: true, default:'en cours' },
});

module.exports = mongoose.model("apointments", appointment);
