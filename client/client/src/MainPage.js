import React,{useState,useEffect} from 'react';
import Axios from 'axios';
import {useNavigate} from 'react-router-dom';
import './App.css';

function MainPage() {
    const [statusList, setStatusList] = useState([]);

    let history = useNavigate();

    useEffect(()=>{
        Axios.get("http://localhost:3002/api/get").then((data)=>{
            setStatusList(data.data);
            //setStatusList((list) => [...list, data]);
        });
    },[])

    return (
        <div className="MainPage">
        <div className="StatusContainer">
        {statusList.map((val,key)=>{
            return (
            <div className="Status" >
            <h1 className="status-content" onClick={()=>(history.push(`/status/${val.id}`))}>{val.time}</h1>
                <p>{val.st_text.length > 300 ? val.st_text.substring(0,300)+ " ..." : val.st_text}</p>
                <h4>{val.user_name}</h4>
                </div>
            )  
        })}  
            </div>
            </div>
    )}

export default MainPage