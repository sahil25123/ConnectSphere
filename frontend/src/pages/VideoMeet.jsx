import React, { use } from 'react'

import { useState, useRef, useEffect } from 'react'

import "../styles/VideoMeet.css"
import { TextField ,Button } from '@mui/material'


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
    const getPermissions= async()=>{
      try{
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        });
        localVideoRef.current.srcObject = stream;
        setVideoAvailable(true);
        setAudioAvailable(true);
        setVideo(true);
        setAudio(true);

        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true
        });
        setScreenAvailable(true);
        setScreenShare(true);
        setScreenShare(screenStream);
      

      }
      catch(err){
        console.log(err);
        setVideoAvailable(false);
        setAudioAvailable(false);
        setVideo(false);
        setAudio(false);
        setScreenAvailable(false);
        setScreenShare(false);
      }
    }

    useEffect(()=>{
      getPermissions();


    },[])
  return (
    <div>
      <h1>Video Meet</h1>
      
      {askforUsername === true ?
      <div>

      <h2>Enter into Lobby</h2>
      <TextField id="outlined-basic" label="Username"  value={username} variant="outlined"  onChange= {(e)=>{setUsername(e.target.value)}}/>
      <Button variant="contained">Join</Button>

      <div>
        <video ref={localVideoRef} autoPlay muted></video>

      </div>



      </div>: <></>   
      }
    </div>
  )
}
