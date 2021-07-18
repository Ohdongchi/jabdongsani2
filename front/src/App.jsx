// module
import React, {useEffect, useState , useMemo, useCallback} from "react";
import {BrowserRouter as Router, Route, Link, Switch, Redirect} from "react-router-dom";
import {useSelector} from "react-redux";
import {useCookies, withCookies} from "react-cookie";
import axios from "axios";


// css
import "./css/main.css";

// component
import Home from "./component/Home";
import FreeBoard from "./component/FreeBoard";
import Write from "./component/BoardWrite";
import Signup from "./component/Signup";
import Menu from "./component/MenuBar";
import Signin from "./component/Signin";

import Test from "./component/Test";



const App = ()=> {

    const [cookies, setCookie, removeCookie] = useCookies(["userToken"]);
    
    const token = useSelector(state=> (state.SigninReducer.userData));
    
    useEffect(()=>{
        if (token) {
            setCookie("userToken", token, {path:"/", secure:true }); // 쿠키 설정 모든 경로
        }
    },[token]);

    const [userProvider, setUserProvider] = useState(false);

    const verifyRequest = () => {
        const tokens = {
            "token":cookies.userToken
        };

        axios.post("http://localhost:8000/auth/token/verify", tokens)
        .then((res)=>{
            setUserProvider(true);
            return true;
        })
        .catch (err=>{
            setUserProvider(false);
            alert(" 사용 시간이 지났습니다. 다시 로그인 해주세요 :) ");
            return false;
        })
    };

    useEffect( () => {
        if (cookies.userToken)
            verifyRequest();
        else {
            setUserProvider(false);
        }
    }, [cookies] );

    console.log(userProvider);
    return (
        <>
            <div>
                <div className="header-logo">
                    <Link to='/'><h2>React 초보 아저씨</h2></Link>
                </div>
                <Menu userProvider={userProvider}/>
            </div>
            <div>
                <div className="content">
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/htmlBoardList" exact component={FreeBoard} />
                        <Route path="/dailyBoardList" exact component={Test}/>
                        <Route path="/boardWrite" exact component={Write} />
                        <Route path="/login" exact component={Signin}/>
                        <Route path="/register" exact component={Signup}/>
                        <Redirect path="*" to="/" />
                    </Switch>
                </div>
            </div>
        </>
    );
};

export default withCookies(App);

// @babel/core = 바벨 기본 = 최신 문법 바꿔주는 모듈
// @babel/preset-env = 브라우저 환경에 맞게 문법을 바꿔주는 모듈
// @babel/preset-react = 리액트 문법 바꿔주는 모듈 (jsx)
// babel-loader = 바벨과 웹팩 연결해주는 모듈
// react-hot-loader =
// webpack-dev-server = 프론트엔드 코드의 변경점을 자동으로 감지해주는 모듈

// webpack-dev-server를 사용하면 dist/app.js를 사용해서 리액트를 빌드하는것이 아닌 가상의 app.js를 만들어서 빌드한다.
