const express = require ('express')
const router = express.Router()
const Job = require('../models/JobModel')

// GETTING ALL the JOB OFFER 

router.get('/',async(req,res)=>{
    try {
        const jobs = await Job.find()
        res.status(200).send(jobs)
    } catch (error) {
        res.status(400).send('Getting Fail')
    }
})

// POST A JOB OFFER

router.post("/add_job",async (req,res)=>{
    try {
        const newJob= new Job({
            name : req.body.name,
            telephone : req.body.telephone,
            email : req.body.email,
            description : req.body.description,
            postNumber:req.body.postNumber,
            deadline : req.body.deadline,
            idEmp : req.body.idEmp,
        })
        const savedJob = await newJob.save()
        res.status(200).send(savedJob)
    } catch (error) {
        res.status(400).send('post Fail')
    }
})

module.exports=router