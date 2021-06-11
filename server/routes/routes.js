const express = require('express')
const router = express.Router()
const bcrypt = require("bcrypt");
const config = require("config")
const objectId = require("mongodb").ObjectID;
const jwt = require("jsonwebtoken")

const {
    newShortLink,
    getAllLink,
    getShortLink,
    deleteLink,
    UpDateLink
    } = require('../utils/data');
router.post('/newShortLink', async function(request,response){
    await newShortLink(request,"link",response);
})
router.get('/getAllLink', async function(req,res){
    await getAllLink(req,"link",res);
})
router.get('/:shortLink',async (req,res)=>{
    await getShortLink(req,"link",res)
})
router.delete('/deleteLink/:id', async function(req,res){
    await deleteLink(req,"link",res);
})
router.put('/UpDateLink/:id', async function(req,res){
    await UpDateLink(req,"link",res);
})

module.exports = router
