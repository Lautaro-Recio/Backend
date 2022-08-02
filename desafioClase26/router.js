const {Router}=require("express")
const api=Router()
const {fork} = require("child_process")

api.get("/randoms",(req,res)=>{
    const nums = fork("./apiRandoms.js")
    nums.on("message",sum=>{
        return res.json(sum)
    })
})

module.exports = api