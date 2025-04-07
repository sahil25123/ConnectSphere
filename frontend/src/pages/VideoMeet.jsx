import { useState, useRef, useEffect } from 'react';
import "../styles/VideoMeet.css";
import { TextField, Button } from '@mui/material';

const server_url = "http://localhost:5000/api/v1/users/me";

export default function VideoMeet() {
  const localVideoRef = useRef();

  const [videoAvailable, setVideoAvailable] = useState(true);
  const [audioAvailable, setAudioAvailable] = useState(true);

  const [video, setVideo] = useState(false);
  const [audio, setAudio] = useState(false);

  const [screenAvailable, setScreenAvailable] = useState(false);
  const [screenStream, setScreenStream] = useState(null);

  const [askforUsername, setAskforUsername] = useState(true);
  const [username, setUsername] = useState("");

  const getPermissions = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      localVideoRef.current.srcObject = stream;
      setVideoAvailable(true);
      setAudioAvailable(true);
      setVideo(true);
      setAudio(true);

      const displayStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });

      setScreenAvailable(true);
      setScreenStream(displayStream);
    } catch (err) {
      console.error(err);
      setVideoAvailable(false);
      setAudioAvailable(false);
      setVideo(false);
      setAudio(false);
      setScreenAvailable(false);
      setScreenStream(null);
    }
  };

  useEffect(() => {
    getPermissions();
  }, []);

  const handleJoin = () => {
    if (username.trim() !== "") {
      setAskforUsername(false);
      // You can initiate the socket connection here later
    }
  };

  return (
    <div className="video-meet-container">
      <h1>Video Meet</h1>

      {askforUsername ? (
        <div className="lobby-section">
          <h2>Enter into Lobby</h2>
          <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
          <br />
          <Button variant="contained" onClick={handleJoin}>
            Join
          </Button>

          <div className="local-video-preview">
            <video ref={localVideoRef} autoPlay muted playsInline></video>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
