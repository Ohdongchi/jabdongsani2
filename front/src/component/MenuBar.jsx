import React, { useCallback, useEffect, useState } from "react";
import {Link, withRouter, useHistory, Redirect} from "react-router-dom";
import {useCookies} from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import {signinInit} from "../redux/SigninReducer";

const navigationBar = ({userProvider}) => {

    const dispatch = useDispatch(); 
    const [cookies, setCookie, removeCookie] = useCookies();
    const history = useHistory();

    const LogoutHandler = useCallback((e)=> {
        if (e.target.text === "로그아웃") {
            dispatch(signinInit());
            removeCookie("userToken");
            history.push("/");
        }
    }, []);
    

    if (userProvider) {
        return (
            <div className="Main_menu">
                <ul>
                    <li>
                        <Link to="/htmlBoardList">HTML</Link>
                    </li>
                    <li>
                        <Link to="/dailyBoardList">Daily</Link>
                    </li>
                    <li>
                        <Link to="/boardWrite">글쓰기</Link>
                    </li>
                    <li>
                        <Link to="/" onClick={LogoutHandler}>로그아웃</Link>
                    </li>
                </ul>
            </div>
        );
    } else {
        return (
            <div className="Main_menu">
                <ul>
                    <li>
                        <Link to="/htmlBoardList">HTML</Link>
                    </li>
                    <li>
                        <Link to="/dailyBoardList">Daily</Link>
                    </li>
                    <li>
                        <Link to="/login">로그인</Link>
                    </li>
                    <li>
                        <Link to="/register">회원가입</Link>
                    </li>
                </ul>
            </div>
        );
    }
};

export default withRouter(navigationBar);