import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import ActionTypes from "../redux/config/ActionTypes";
import axios from "axios";

const home = ()=>{

    const dispatch = useDispatch(); 
    let history = useHistory();
    const [cookies, setCookie, removeCookie] = useCookies();
    const [userDatas, setUserDatas] = useState(null);

    const verifyRequest = () => {
        const token = {
            "token":cookies.userToken
        };

        axios.post("http://localhost:8000/auth/token/verify", token)
        .then((res)=>{
            setUserDatas(res.data);
            console.log(res.data);
            return 1;
        })
        .catch (err=>{
            alert(" 사용 시간이 지났습니다. 다시 로그인 해주세요 :) ");
            return 0;
            // console.error(err);
        })
    };

    useEffect( () => {
        if (cookies.userToken)
            verifyRequest();
    }, [cookies] );

    return (
        <>
            <h2>Home</h2>
        </>
    );
};

export default home;