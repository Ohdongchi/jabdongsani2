import React, { useRef, useState, useContext } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import {useCookies} from "react-cookie";

//reducer
import {signinData} from "../redux/SigninReducer";
import { useHistory } from "react-router";

// register
const signup = () => {

    // props
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [PasswordCheck, setPasswordCheck] = useState("");
    const [Name, setName] = useState("");
    const pwdRef = useRef(null);
    const trypwdRef = useRef(null);
    const history = useHistory();

    const dispatch = useDispatch();

    const changeEmailHandler = (e) => {
        setEmail(e.target.value);
    };

    const changePasswordHanlder = (e) => {
        setPassword(e.target.value);
    };

    const changePasswordCheckHanlder = (e) => {
        setPasswordCheck(e.target.value);
    };

    const changeNameHanlder = (e) => {
        setName(e.target.value);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        let passwordRegExp = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
        let emailRegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        if ( !emailRegExp.test(Email) ){
            alert("이메일 형식이 올바르지 않습니다 !");
        } else if ( !passwordRegExp.test(Password) ) {
            alert("비밀번호 형식이 올바르지 않습니다 !")
            pwdRef.current.value="";
            trypwdRef.current.value="";
        } else{
            if (Password == PasswordCheck) {
                const SD = {
                    "email": Email,
                    "password": Password,
                    "name": Name
                };
                if (Email != "" && Password != "" && PasswordCheck != "" && Name != ""){
                    
                    axios.post("http://localhost:8000/auth/signup",SD)
                        .then(res=>{
                            console.log(res);
                            if (res.status === 200) {
                                if (res.data === "success"){
                                    alert("가입이 완료되었습니다 !");
                                    history.push("/");
                                }else{
                                    alert("이메일이 이미 존재합니다 !");
                                }
                            }
                        })
                        .catch(error=>{
                            console.error(error);
                        })
                }
            }
        }
    };

    const [cookies, setCookie, removeCookie] = useCookies();
    
    let isUser = cookies.userToken;

    if(!isUser)
        return (
            <>
                <React.Fragment>
                    <div className="signup-page-container">
                        <form className="signup-page-box" onSubmit={submitHandler} >
                            <h3>회원가입</h3>
                            <div>
                                <label htmlFor="Email">Email : </label>
                                <input type="email" placeholder="Example@naver.com" id="Email" onChange={changeEmailHandler} />
                            </div>
                            <div>
                                <label htmlFor="password">Password : </label>
                                <input type="password" autoComplete="off" ref={pwdRef} placeholder="Please enter your password" id="password" onChange={changePasswordHanlder} />
                            </div>
                            <div>
                                <label htmlFor="passwordCheck">Password Check : </label>
                                <input type="password" autoComplete="off" ref={trypwdRef} placeholder="Please enter your password again" id="passwordCheck" onChange={changePasswordCheckHanlder} />
                            </div>
                            {Password != PasswordCheck
                                ? (
                                    <div>
                                        <p>비밀번호가 일치하지 않습니다.</p>
                                    </div>
                                )
                                : Password != "" ?
                                    (
                                        <div>
                                            <p>비밀번호가 일치합니다.</p>
                                        </div>
                                    )
                                    : null
                            }

                            <div>
                                <label htmlFor="nickname">Nickname : </label>
                                <input type="text" placeholder="Please enter your nickname" id="nickname" onChange={changeNameHanlder} />
                            </div>
                            <div>
                                <input type="submit" value="가입하기" className="signupSubmitButton"/>
                            </div>
                        </form>
                    </div>

                </React.Fragment>

            </>
        );
    else return history.push("/");
}

export default signup;