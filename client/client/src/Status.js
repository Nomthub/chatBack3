import './App.css';
//import ScrollToBottom from "react-scroll-to-bottom";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState , useEffect} from 'react';
import Axios from 'axios';
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

function Status({socket, username, status}) {
    const [currentUsername, setCurrentUsername] = useState("");
    const [currentstatus, setCurrentStatus] = useState("");
    const [statusList, setStatusList] = useState([]);

    const add_status = async () => {
      if(currentUsername !== ""){
        const statusData = {
          status : currentstatus,
          author : currentUsername,
          //comment : comment,
          time : new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      Axios.post('http://localhost:3002/api/create', {username: username, status: status})

        await socket.emit("add_status", statusData);
        //setShowComment(true);
        setStatusList((list) => [...list, statusData]);
        setCurrentStatus("");
        
      }
    };
  
    useEffect(() => {
      socket.on("recieve_status", (data) =>{
          //console.log(data);
          setStatusList((list) => [...list, data]);
        });
      }, [socket]);
 
  return (
    <div className="App">
      <header className="App-header">
        <h3> Build3 </h3>
      </header>
        <div className='joinConvo'>
          <div className='App-com-box' id="status_box">
            <label> Username: </label>
            <input type='text' 
              onChange={(event) => {
                setCurrentUsername(event.target.value);
              }}
            ></input>
            <br></br>

            <label> Status: </label>
            <textarea 
              id="status" rows="5" cols="70" 
              onChange={(event) => {
                setCurrentStatus(event.target.value);
              }}
            ></textarea>
            <br/><br/>
            <button id="add_status" onClick={add_status}> Add Status</button>
          </div>
        </div>
    </div>
  )
}

export default Status;
