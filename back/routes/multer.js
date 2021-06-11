const express = require("express");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
// const { isLoggedIn, isNotLoggedIn } = require("./loginCheck");
require("dotenv").config();

const { User } = require("../models");

const router = express.Router();

fs.readdir("uploads", error => {
    if (error) {
        console.error("uploads 폴더가 없어 uploads 폴더를 생성합니다.");
        fs.mkdirSync("uploads");
    }
});

const upload = multer({
    storage:multer.diskStorage({
        destination(req,file,cb) {
            cb(null,"uploads/");
        },
        filename(req,file,cb) {
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + new Date().valueOf() + ext);
        }
    }),
    limits:{fileSize:5 * 1024 * 1024}
});

router.post("/img", upload.single("imgFile"), (req,res)=>{ // image 파일 요청 후 처리된 파일 url을 json 형식으로 parsing
    console.log(req.file);
    res.send(`http://localhost:8000/img/${req.file.filename}`);
});

// router.post ('/test', async (req,res) => {
//     console.log("hi!");
//     res.send("hi !");
// });

module.exports=router;