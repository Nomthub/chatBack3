import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import io from "socket.io-client";
import Comments from './Comments';
import Status from './Status';
import MainPage from './MainPage';

const socket = io.connect("http://localhost:3001")

/*$(document).ready(() => {
  const socket = io();
  ("#add_status").click(() => {
    socket.emit('status added', $("comment").value());
  });
  socket.on('refresh feed', function(msg){
    $("#show_comments").append(msg + '<br/><br/>');
  });
});
*/

function App() {
  //const [username, setUsername] = useState("");
  //const [status, setStatus] = useState("");
  //const [showComments, setShowComment] = useState(false);
  //const [statusList, setStatusList] = useState([]);

 /* const add_status = async () => {
    if(username !== ""){
      const statusData = {
        status : currentstatus,
        author : username,
        comment : comment,
        time : new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
    };

      await socket.emit("add_status", status);
      setShowComment(true);
      setStatusList((list) => [...list, statusData]);
      setStatus("");
      
    }
  };

  useEffect(() => {
    socket.on("recieve_status", (data) =>{
        //console.log(data);
        setStatusList((list) => [...list, data]);
    }, [socket]);
});*/

  return (
  <div className="App">
    <header className="App-header">
      <h3> Build3 </h3>
    </header>
      <div>
        <div className="navbar">
         <div className="links"> 
         <a href="/">Main Page</a>
         <a href="/Status">Create Post</a>
         </div>
         </div>
      <Router>
        <Routes>
          <Route path="/" exact render={(props) => <MainPage />} />
          <Route path="/Status" render={(props)=> <Status />} />
          <Route path="/Status/:StatusId" render={(props)=> < Comments/>}/>
        </Routes>
      </Router>
      </div>
    </div>
  )
}

export default App;
