const express = require("express");
const fs = require("fs");
const router = express.Router();
const {User, FreeBoard} = require("../models")

router.post ('/write', async (req,res) => {
    try{
        const boardUpload = await FreeBoard.create({
            title:req.body.title,
            content:req.body.writeValue,
            userId:null,
        })
    }catch (err) {
        console.error(err);
    }


    console.log("write 받음 !");
    console.log(req.body);
    res.send("hi !");
});

router.post("/register", async (req, res, next) => {
    try {
      const exUser = await User.findOne({ where: { email: req.body.email } });
      if (exUser) {
        req.flash("registerError", "이미 가입된 이메일 입니다.");
        return res.redirect("/");
      } else {
        const hash = await bcrypt.hash(req.body.password, 10);
        await User.create({
          email: req.body.email,
          nick: req.body.name,
          password: hash,
          profile_image: req.body.ProfileUrl,
        });
        res.redirect("/");
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  });

module.exports=router;