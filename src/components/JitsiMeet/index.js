import React from "react";
import { JitsiMeeting } from "@jitsi/react-sdk";

function JitsiMeet() {

  const id = params.params.topicId;

  let newid = parseInt(id, 10);

  const generateRoomName = () => `JitsiMeetRoomNo${newid}`;

  const handleJitsiIFrameRef1 = iframeRef => {
    iframeRef.style.border = '10px solid #3d3d3d';
    iframeRef.style.background = '#3d3d3d';
    iframeRef.style.height = '400px';
};
  

  return (

    <JitsiMeeting
  //  domain = { YOUR_DOMAIN }
    roomName = { generateRoomName }
    configOverwrite = {{
        startWithAudioMuted: true,
        disableModeratorIndicator: true,
        startScreenSharing: true,
        enableEmailInStats: false
    }}
    interfaceConfigOverwrite = {{
        DISABLE_JOIN_LEAVE_NOTIFICATIONS: true
    }}
    userInfo = {{
        displayName: 'YOUR_USERNAME'
    }}
    onApiReady = { (externalApi) => {
        // here you can attach custom event listeners to the Jitsi Meet External API
        // you can also store it locally to execute commands
    } }
    getIFrameRef = { handleJitsiIFrameRef1 } 
    />

  );
}

export default JitsiMeet;

