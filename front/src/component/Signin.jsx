import React, { useRef, useState, useContext } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import {signinRequest } from "../redux/SigninReducer";
import ActionTypes from "../redux/config/ActionTypes";
import {useHistory} from "react-router-dom";

const Signinpage = () => {
    // variable
    const [SigninEmail, setSigninEmail] = useState(null);
    const [SigninPassword,setSigninPassword] = useState(null);
    let history = useHistory();
    // Ref

    const passwordRef = useRef(null);

    const dispatch = useDispatch();


    const changeEmailHandler = (e) => {
        setSigninEmail(e.target.value);
    };
    
    const changePasswordHandler = (e)=> {
        setSigninPassword(e.target.value);
    }
    const OnSubmitHandler = (e) => {
        e.preventDefault();
        let emailRegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        let passwordRegExp = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
        if ( !emailRegExp.test(SigninEmail)){
            alert("이메일 형식이 올바르지 않습니다 !");
        } else if ( !passwordRegExp.test(SigninPassword)) {
            alert("비밀번호 형식이 올바르지 않습니다 !")
            passwordRef.current.value="";
        }else {
            const SigninDataObject = {
                "email":SigninEmail,
                "password":SigninPassword
            };
            console.log(SigninDataObject);
            dispatch(signinRequest(SigninDataObject));
            history.push("/");
        }
    }; 

    return (
        <>
            <React.Fragment>
                <div className="signin-page-container" >
                    <form className="signin-page-box" onSubmit={OnSubmitHandler} >
                        <h3>로그인</h3>
                        <div>
                            <label htmlFor="Email">Email : </label>
                            <input type="email" placeholder="Example@naver.com" id="Email" onChange={changeEmailHandler} />
                        </div>
                        <div>
                            <label htmlFor="password">Password : </label>
                            <input type="password" ref={passwordRef} autoComplete="off" placeholder="Please enter your password" id="password" onChange={changePasswordHandler} />
                        </div>
                        <div>
                            <input type="submit" value="로그인" className="signupSubmitButton" />
                        </div>
                    </form>
                </div>
            </React.Fragment>
        </>
    );

};

export default Signinpage;