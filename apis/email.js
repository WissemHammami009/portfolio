var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
router.use(bodyParser.json());

const Email = require('../models/email')

router.post('/send',async (req,res)=>{
    const email = new Email(req.body)
    email.save().then(resp=>{
        res.status(200).json({code:200,resp})
    }).catch(err=>{
        res.json({code:500,message:err.message})
    })
})

router.post('/getemails',async (req,res)=>{
    Email.find({toalias:req.body.hashuser}).sort({time:-1}).then(resp=>{
        res.json(resp)
    }).catch(err=>{
        res.json({code:err.code,message:err.message})
    })
})

router.post('/countemails',async (req,res)=>{
    Email.find({hashuser:req.body.hashuser}).count().then(resp=>{
        res.json({number:resp})
    })
})

router.delete('/delete',async (req,res)=>{
    Email.deleteOne({id:req.body.id,hashuser:req.body.hashuser}).then(resp=>{
        if (resp.deletedCount > 0) {
            res.json({deleted:true})
        }
        else {
            res.json({deleted:false})
        }
    }).catch(err=>{
        res.json({deleted:false,message:err.message})
    })
})

module.exports = router;