const express = require("express");
const fs = require("fs");
const path = require('path');

const router = express.Router();


router.get('*', function (req, res) {
    res.render('layout');
});
module.exports=router;