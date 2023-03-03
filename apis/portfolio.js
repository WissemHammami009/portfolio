var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
router.use(bodyParser.json());

const portfolio= require('../models/portfolio');

//create new alias for new portfolio 
router.post("/create-portfolio",async (req,res)=>{
    const port = new portfolio({
        alias:req.body.alias,
        experience:[{time:"",entreprise:"",description_post:""}],
        education:[{diploma:"",time:"",university:"",branch:""}],
        skills:[{skill:"",percentage:""}],
        certif:[{name:""}]

    })
    port.save({alias:req.body.alias}).then(resp=>{
        res.json({code:200,resp})
    }).catch(err=>{
        res.json({code:err.code})
    })
})

//check if having a portfolio
router.post("/check/portfolio",async (req,res)=>{
    portfolio.findOne({alias:req.body.alias}).then(resp=>{
        if(resp == null ){
            res.status(200).json({data:false})
        }else {
            res.status(200).json({data:true})
        }
    })
})

router.post('/profile',(req,res)=>{
    
    const find = portfolio.findOne({alias:req.body.alias}).then(resp=>{
        if (resp == null) {
            res.status(200).json({data:false})
        }
        else {
            res.status(200).json(resp)
        }
        })
})
router.get('/lastest',(req,res)=>{
    const find = portfolio.find({},{alias:1}).limit(10).then(resp=>{
        res.status(200).json(resp)
    })
})

router.post('/getheader',(req,res)=>{
    const find = portfolio.findOne({alias:req.body.alias}).then(resp=>{
        if (resp == null) {
            res.status(200).json({found:false,message:"No data found"})
        }
        else{
            let json = {
                found:true,
                full_name:resp.full_name,
                street:resp.street,
                town:resp.town,
                phone:resp.phone,
                email:resp.email,
                description:resp.description,
                facebook:resp.facebook,
                linkedin:resp.linkedin,
                github:resp.github,
                image_url:resp.image_url
                }
            res.status(200).json(json)
        }
    })
})
router.patch("/updateheader",(req,res)=>{
    let alias = req.body.alias
    delete req.body.alias
    const data = portfolio.updateOne({alias:alias},{$set:req.body}).then(resp=>{
        if (resp.modifiedCount > 0) {
            res.status(200).json({isModified:true})
        }
        else {
            res.status(200).json({isModified:false})
        }
    })
})

router.patch('/updateskills',(req,res)=>{
    let alias = req.body.alias
    delete req.body.alias
    const data = portfolio.updateOne({alias:alias},{$set:req.body}).then(resp=>{
        if (resp.modifiedCount > 0) {
            res.status(200).json({isModified:true})
        }
        else {
            res.status(200).json({isModified:false})
        }
    })
})

router.post('/getskills',(req,res)=>{
    const find = portfolio.findOne({alias:req.body.alias}).then(resp=>{
        if (resp == null) {
            res.status(200).json({found:false,message:"No data found"})
        }
        else{
            
            res.status(200).json(resp.skills)
         }
    })
})


router.patch('/updatecertif',(req,res)=>{
    let alias = req.body.alias
    delete req.body.alias
    const data = portfolio.updateOne({alias:alias},{$set:req.body}).then(resp=>{
        if (resp.modifiedCount > 0) {
            res.status(200).json({isModified:true})
        }
        else {
            res.status(200).json({isModified:false})
        }
    })
})

router.post('/getcertif',(req,res)=>{
    const find = portfolio.findOne({alias:req.body.alias}).then(resp=>{
        if (resp == null) {
            res.status(200).json({found:false,message:"No data found"})
        }
        else{
            
            res.status(200).json(resp.certif)
         }
    })
})

router.patch('/updateinterest',(req,res)=>{
    let alias = req.body.alias
    delete req.body.alias
    const data = portfolio.updateOne({alias:alias},{$set:req.body}).then(resp=>{
        if (resp.modifiedCount > 0) {
            res.status(200).json({isModified:true})
        }
        else {
            res.status(200).json({isModified:false})
        }
    })
})

router.post('/getinterest',(req,res)=>{
    const find = portfolio.findOne({alias:req.body.alias}).then(resp=>{
        if (resp == null) {
            res.status(200).json({found:false,message:"No data found"})
        }
        else{
            
            res.status(200).json({interest:resp.interest})
         }
    })
})
//get experience
router.post('/getexperience',(req,res)=>{
    portfolio.findOne({alias:req.body.alias}).then(resp=>{
        if (resp == null) {
            res.status(200).json({found:false,message:"No data found"})
        }
        else{
            res.status(200).json(resp.experience)
         }
    })
})

//update experience 
router.patch('/updateexperience',(req,res)=>{
    let alias = req.body.alias
    delete req.body.alias
    const data = portfolio.updateOne({alias:alias},{$set:req.body}).then(resp=>{
        if (resp.modifiedCount > 0) {
            res.status(200).json({isModified:true})
        }
        else {
            res.status(200).json({isModified:false})
        }
    })
})
module.exports = router;