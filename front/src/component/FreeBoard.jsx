import React, { useState, useEffect, useMemo } from "react";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {freeRequest} from "../redux/getFreeBoardReducer";
import ActionTypes from "../redux/config/ActionTypes";

const freeBoard = () => {

  const dispatch = useDispatch();
  
  
  useEffect(()=> {
    dispatch(freeRequest());
  }, []);

  const dataList = useSelector(state=> state.getFreeBoard.freeBoardData);
  
  const [perPage, setPerPage] = useState(5);
  const [infData, setInfData] = useState(dataList.slice(0, perPage - 1));
  
  const sliceData = () => {
    return perPage <= dataList.length
      ? setInfData(dataList.slice(0, perPage))
      : setInfData(dataList.slice(0, dataList.length + 1));
    // return perPage < dataList.length ? setInfData(dataList.slice(index,dataList.length-1)) : setInfData(dataList.slice(index,perPage-1))
  };

  const infScroll = () => {
    let scrollHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    );
    let scrollTop = Math.max(
      document.documentElement.scrollTop,
      document.body.scrollTop
    );
    let clientHeight = document.documentElement.clientHeight;
    // console.log(scrollHeight, scrollTop, clientHeight);
    if (scrollTop + clientHeight >= scrollHeight) {
      setPerPage(perPage + 2);
      sliceData();
    }
  };

  

  useEffect(() => {
    window.addEventListener("scroll", infScroll);
    // console.log(infData);
    return () => {
      window.removeEventListener("scroll", infScroll);
    };
  }, []);

  return (
    <React.Fragment>
      <div className="grid-box">
        {
          infData.map((data) => {
              return (
                  <div className={"grid-items"+data.id} key={data.id}>
                      <h2>{data.title}</h2>
                  </div>
              );
          })
        }
      </div>
    </React.Fragment>
  );
  // return (<div></div>);
};

export default freeBoard;
