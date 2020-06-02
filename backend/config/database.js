const mongoose = require ('mongoose')
require('dotenv/config')

const mongoUri = process.env.MONGO_URI

mongoose.connect(mongoUri,{useNewUrlParser : true,useUnifiedTopology: true, useCreateIndex:true },()=>{
    console.log('Connected to MongoDB...')
})