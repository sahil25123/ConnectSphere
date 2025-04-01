import React from 'react'

import { useState, useRef, useEffect } from 'react'

import "../styles/VideoMeet.css"
import { TextField } from '@mui/material'


const  server_url  ="http://localhost:5000/api/v1/users/me";
export default function VideoMeet() {
  var socketRef= useRef();
  let socketIdRef= useRef();

  let localVideoRef= useRef();

  let [videoAvailable, setVideoAvailable]= useState(true);
  let [audioAvailable, setAudioAvailable]= useState(true);

  let [video, setVideo]= useState(false);
  let [audio, setAudio]= useState(false);

  let[screenShare, setScreenShare]= useState(false);
  let [showModal, setShowModal]= useState(false);

  let [ screenAvailable, setScreenAvailable]= useState(false);
  let [message, setMessage]= useState("");

  let [messageList, setMessageList]= useState([]);
  let [messageText, setMessageText]= useState("");

  let [askforUsername, setAskforUsername]= useState(true);
  let [username, setUsername]= useState("");
  let [userList, setUserList]= useState([]);

  const videoRef= useRef();

  // if(isChrome()=== false){
  //   alert("Please use Google Chrome for this application");
  // }



   

  var connections = {};


  // stun ser
    const peerConfigConnection =  {
        "iceServers": [
            {
                "urls": "stun:stun.l.google.com:19302"
            }
           
        ]
    }
  return (
    <div>
      <h1>Video Meet</h1>
      
      {askforUsername === true ?
      <div>

      <h2>Enter into Lobby</h2>
      <TextField id="outlined-basic" label="Username" variant="outlined"  onChange= {(e)=>{setUsername(e.target.value)}}/>





      </div>: <></>   
      }
    </div>
  )
}
