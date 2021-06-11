const express = require("express");
const fs = require("fs");
const router = express.Router();
const {User, FreeBoard} = require("../models")

router.post('/test', async (req,res, next) => {
    console.log("hi!");
    // res.send("hi !");
});

router.get("/freeBoard", async (req,res,next) => {
    console.log("hi!");

    const data = await FreeBoard.findAll({
        order: [
            ['createdAt', 'DESC']
        ],
    });
    
    return res.json(data);
});
module.exports=router;