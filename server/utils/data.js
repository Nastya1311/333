const express = require('express')
const router = express.Router()
const objectId = require("mongodb").ObjectID;
const shortId = require('shortid')

const newShortLink = async (request, role, response) => {
    if(request.body.message==='') return  response.send({message:"Введіть повідомлення"});
    const collection = request.app.locals.collection;
    const link = {
        _id:String(Date.now()),
        role:role,
        baseLink:request.body.baseLink,
        shortLink:shortId.generate(),
        click:Number(0),
        date:new Date().toLocaleString('uk-UA'),
        upDateDate:new Date().toLocaleString('uk-UA')
    }
    collection.insertOne(link,function (err,result){
        if(err){
            console.log(err);
            response.sendStatus(500);
        }
        response.send(link)
    })
}
const getAllLink = async (req,role,res)=>{
    const collection = req.app.locals.collection;
    collection.find({role:role},{ _id: 0 }).toArray()
    .then(link => {
        res.send({
            link
        })
    });
}
const getShortLink = async (req,role,res)=>{
    const collection = req.app.locals.collection;
    const shortLink = req.params.shortLink
    console.log(shortLink)
    collection.findOne({shortLink:shortLink},function(err,result){
        if(err) return console.log(err)
        let link = result;
        console.log(link)
        res.redirect(link.baseLink)
    })
}
const deleteLink = async (req,role,res)=>{
    const id =req.params.id;
    const collection = req.app.locals.collection;
    collection.findOneAndDelete({_id: id}, function(err, result){         
        if(err) return console.log(err);    
        let user = result.value;
        res.send(user);
    });
}
const UpDateLink = async (req,role,res) =>{
    if(!req.body) return res.sendStatus(400);
    const id = req.params.id;
    const click = req.body.click;
    const collection = req.app.locals.collection;
    collection.findOneAndUpdate({_id: id}, { $set: {click: click}},
         {returnOriginal: true },function(err, result){
        if(err) return console.log(err);     
        const user = result.value;
        console.log(result)
        res.sendStatus(200);
    });
}
module.exports = {
    newShortLink,
    getAllLink,
    getShortLink,
    deleteLink,
    UpDateLink
}
