const express = require("express");
const fs = require("fs");
const router = express.Router();
const { User, Board_1 } = require("../models")
const bcrypt = require("bcrypt");
const passport = require("passport");

const jwt = require("jsonwebtoken");
require("dotenv").config();

router.post("/signup", async (req, res) => {
    const exUser = await User.findOne({ where: { email: req.body.email } });
    try {
        if (exUser) {
            console.log("이미 가입된 이메일입니다 !");
            res.send("faild")
        } else {
            const passwordHash = await bcrypt.hash(req.body.password, parseInt(process.env.hashFunctionPoint));
            await User.create({
                email: req.body.email,
                password: passwordHash,
                nickname: req.body.name,
            });
            console.log("회원가입 완료 !");
            res.send("success");
        }
    } catch (err) {
        console.error(err);
    }
});
router.post("/test", async (req,res) => {
    try{
        console.log("hi !");

    }catch (er) {
        console.error(er);
    }
});
router.post("/signin", async (req, res, next) => {
    try {
        console.log('실행');
        await passport.authenticate("local", (error, user, info) => {

            // console.dir(error);
            // console.dir(user);
            // console.dir(info);

            if (error || !user) {
                console.log("error:", error, info.message);
                return;
            };

            req.login(user, { session: false }, (error) => {
                // console.log("user:", user, user.id);
                if (error) {
                    console.error(error);
                    return;
                }
                let token = jwt.sign({ id: user.id, email: user.email, nickname: user.nickname }, process.env.jwtSecretKey, { expiresIn: "15m" });
                console.log("token:", token); // access token 발급
                res.json(token);
            });
        })(req, res, next);
    } catch (error) {
        console.error(error);
        return;
    }
});

// jwt 인증 방식
// access token = 로그인한 유저가 맞는지 액세싱 하기 위한 토큰
// refresh token = access token 기간이 만료되면 새로운 access token을 발급해주기 위해 인증 해주는 토큰

// 순서
// login 정보를 서버에 요청 -> access token 및 refresh token 발급 -> 클라이언트에서 받아서 쿠키에 저장 
// -> 권한 확인을 위해 서버로 액세스토큰 전달 -> 서버에서 access token으로 사용자가 일치하는지 확인
// -> 토큰이 일치하면 유저 정보를 response

// access token 만료 -> refresh token 서버에 요청 -> refresh token 인증 -> 인증이 됐다면 access token 재발급


// passport.authenticate("jwt", {session:false}), 
router.post("/token/verify",  async (req, res, next) => {
    try {
        const checkAnswer =  jwt.verify(req.body.token, process.env.jwtSecretKey)
        // console.log("error", checkAnswer);
        return res.status(200).json(checkAnswer);
    } catch (err) {
        console.error(err);
        return res.status(400).send("not found user");
    }

});
module.exports = router;