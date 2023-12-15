import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

function Comments({socket, username, status}){
    const [currentMessage, setCurrentMessage] = useState("");
    const [commentList, setCommentList] = useState([]);

    const sendComment = async () => {
        if(currentMessage !== ""){
            const commentData = {
                status : status,
                author : username,
                comment : currentMessage,
                time : new Date(Date.now()).getHours() +
                ":" +
                new Date(Date.now()).getMinutes(),
            };

            await socket.emit("send_comment", commentData);
            setCommentList((list) => [...list, commentData]);
            setCurrentMessage("");
        }
    };

    useEffect(() => {
        socket.on("recieve_comment", (data) =>{
            //console.log(data);
            setCommentList((list) => [...list, data]);
        }, [socket]);
    });

    return(
        <div className="comment-window">
            <div className="comment-header">
            <p>
              Small chat 
            </p>
            </div>

            <div className="comment-body">
                <ScrollToBottom className='message-container'>
                {commentList.map((commentContent) => {
                    return (
                        <div 
                            className="comment"
                            id = {username === commentContent.author ? "you" : "other"}
                        >
                            <div>
                                <div className="comment-content">
                                    <p>{commentContent.comment}</p>
                                </div>
                                <div className="comment-meta">
                                    <p id="time"> {commentContent.time} </p>
                                    <p id="author">{commentContent.author} </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
                </ScrollToBottom>
            </div>
            <div className="comment-footer">
                <input 
                    type="text"
                    value={currentMessage}
                    placeholder="Thoughts?"
                    onChange={(event) =>{
                        setCurrentMessage(event.target.value);
                    }}
                    onKeyPress={(event) => {
                        event.key === "Enter" && sendComment(); 
                    }}
                />
                <button  onClick={sendComment}> COMMENT </button>
            </div>
        </div>
    );
}

export default Comments;