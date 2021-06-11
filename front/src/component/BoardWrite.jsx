// react module
import React, { useRef, useReducer, useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import {useCookies} from "react-cookie";
import { useHistory } from "react-router-dom";
// quill module
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// component

// redux
import { useSelector, useDispatch } from 'react-redux';
import {signinInit} from "../redux/SigninReducer";

// import ResizeModal from "./showResizeModal";
const postWrite =  () => {
    const editorRef = useRef(null);
    const titleRef = useRef(null);
    const [text, setText] = useState('');

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
            dispatch(signinInit());
            removeCookie("userToken");
            setUserDatas("");
            alert(" 사용 시간이 지났습니다. 다시 로그인 해주세요 :) ");
            return 0;
            // console.error(err);
        })
    };

    useEffect( () => {
        if (cookies.userToken){
            verifyRequest();
        } else {
            alert(" 로그인 먼저 하시개 ~ ");
            history.push("/login");
        }
    }, [cookies] );
    
    const modules = useMemo(() => ({
        toolbar: {
            container: [
                [{ 'header': [1, 2, 3, 4, 5, false] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                ['link', 'image'],
                [{ 'align': [] }, { 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                ['clean']
            ],
            handlers: {
                image: imageHandler
            }
        },
    }), []);

    const formats = [
        //'font',
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image',
        'align', 'color', 'background',
    ];

    const handleChange = (value) => {
        setText(value);
        // console.log(value);
    };

    const imageHandler = () => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();

        input.addEventListener("change", () => {
            const file = input.files[0];
            const formData = new FormData();
            formData.append("imgFile", file);
            const range = editorRef.current.getEditor().getSelection();

            axios.post("http://localhost:8000/file/img", formData)
                .then(res => {
                    if (res.status == "200") {
                        console.log(res.data);
                        // quill 에 insert
                        editorRef.current.getEditor().insertEmbed(range.index , "image", res.data);
                        editorRef.current.getEditor().insertEmbed(range.index + 2, "");
                        editorRef.current.getEditor().setSelection(range.index + 2 , 0);
                        editorRef.current.focus();
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        });
    };
    
    const postHandler = () => {
        if (text != null && titleRef.current.value != "" && userDatas !== "") {
            axios.post("http://localhost:8000/post/write", {
                title:titleRef.current.value,
                writeValue:text,
            })
                .then(res => {
                    if (res.status == "200") {
                        alert("작성완료 !");
                        history.push("/");
                    }
                })
                .catch(error => {
                    console.log("작성 실패 !");
                    console.log(error);
                })
            
        }
    };

    return (
        <React.Fragment>
            <div>
                <div>
                    <label style={{
                        fontSize: "15px"
                    }}
                        htmlFor="title"
                    > 제목 : </label>
                    <input ref={titleRef} type="text" placeholder="제목" id="title" />
                </div>
            </div>
            <ReactQuill
                defaultValue={""}
                value={text}
                style={{
                    height: "600px",
                    display: "block",
                    marginBottom: "100px"
                }}
                theme="snow"
                modules={modules}
                formats={formats}
                onChange={handleChange}
                ref={editorRef}
                placeholder="Hello React !"
            />
            <h4 className="postWriteError"></h4>
            <div className="postWriteBox">
                <input type="button" value="작성하기" onClick={postHandler}/>
            </div>

            {/* <ResizeModal isOpen={isOpen}/> */}
        </React.Fragment>
    );
};


export default postWrite;