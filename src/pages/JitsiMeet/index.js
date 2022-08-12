import { JitsiMeeting } from '@jitsi/react-sdk';
import React, { useRef, useState } from 'react';
import { Link } from "wouter";
import { Route } from "wouter";
import MyCommunityPage from "pages/MyCommunity";
export default function JitsiMeetPage(params) {
    const apiRef = useRef();
    const [ logItems, updateLog ] = useState([]);
    const [ knockingParticipants, updateKnockingParticipants ] = useState([]);

    const id = params.params.jitsiId;

    let newid = parseInt(id, 10);
    console.log(newid);
    console.log(id);
    const printEventOutput = payload => {
        updateLog(items => [ ...items, JSON.stringify(payload) ]);
    };

    const handleAudioStatusChange = (payload, feature) => {
        if (payload.muted) {
            updateLog(items => [ ...items, `${feature} off` ])
        } else {
            updateLog(items => [ ...items, `${feature} on` ])
        }
    };

    const handleChatUpdates = payload => {
        if (payload.isOpen || !payload.unreadCount) {
            return;
        }
        apiRef.current.executeCommand('toggleChat');
        updateLog(items => [ ...items, `you have ${payload.unreadCount} unread messages` ])
    };

    const handleKnockingParticipant = payload => {
        updateLog(items => [ ...items, JSON.stringify(payload) ]);
        updateKnockingParticipants(participants => [ ...participants, payload?.participant ])
    };

    const handleJitsiIFrameRef1 = iframeRef => {
        iframeRef.style.marginTop = '5px';
        iframeRef.style.border = '10px solid #3d3d3d';
        iframeRef.style.background = '#3d3d3d';
        iframeRef.style.height = '625px';
    };

    const handleApiReady = apiObj => {
        apiRef.current = apiObj;
        apiRef.current.on('knockingParticipant', handleKnockingParticipant);
        apiRef.current.on('audioMuteStatusChanged', payload => handleAudioStatusChange(payload, 'audio'));
        apiRef.current.on('videoMuteStatusChanged', payload => handleAudioStatusChange(payload, 'video'));
        apiRef.current.on('raiseHandUpdated', printEventOutput);
        apiRef.current.on('titleViewChanged', printEventOutput);
        apiRef.current.on('chatUpdated', handleChatUpdates);
        apiRef.current.on('knockingParticipant', handleKnockingParticipant);
    };

    const handleReadyToClose = () => {
        
        console.log('amonoooooos');
    };

    const generateRoomName = () => `JitsiMeetIspeakRoomNo${newid}`;

    const renderSpinner = () => (
        <div style = {{
            fontFamily: 'sans-serif',
            textAlign: 'center'
        }}>
            Loading..
        </div>
    );

    return (
        <>
            <JitsiMeeting
                roomName = { generateRoomName() }
                spinner = { renderSpinner }
                config = {{
                    subject: 'New Room',
                    hideConferenceSubject: false
                }}
                onApiReady = { externalApi => handleApiReady(externalApi) }
                onReadyToClose = { handleReadyToClose }
                getIFrameRef = { handleJitsiIFrameRef1 } 
                />

        </>
    );
};

