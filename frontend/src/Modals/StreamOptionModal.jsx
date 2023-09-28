// import React, {useEffect, useState} from 'react';
import { Checkbox, Button } from 'antd';
import React, { useState} from 'react';
import { CloseOutlined } from '@ant-design/icons';
import '../CSS/StreamOptionModal.css'

const StreamOptionModal = ({open, onClose, onCamSettingChange}) => {

    // useState to store selection from the checkbox
    const [selectedOptions, setSelectedOptions] = useState({
        pointCloud: false,
        intensity: false
    });

    //state to store WebSocket connections
    const [pointCloudSocket, setPointCloudSocket] = useState(null);
    const [intensitySocket, setIntensitySocket] = useState(null);

    if (!open) return null;

    // function for checkbox selection
    const onChange = (e) => {
        const { name, checked } = e.target;
        setSelectedOptions ({
            ...setSelectedOptions,
            [name]: checked,
        });
        console.log(`checked = ${checked}`);
    };

    // function to establish WebSocket connection
    const connectWebSocket = (endpoint) => {
        const serialNumber = 2020045;
        const socket = new WebSocket(`ws://localhost:8001/${endpoint}/${serialNumber}`);

        socket.addEventListener('open', (event) => {
            console.log('WebSocket connection opened:', event);
        });

        socket.addEventListener('message', (event) => {
            console.log('Message received from the server:', event.data);
        });

        socket.addEventListener('close', (event) => {
            console.log('WebSocket connection closed:', event);
        });

        socket.addEventListener('error', (event) => {
            console.error('WebSocket connection error:', event);
        });

        return socket;
    };

    // function to start streaming based on selections
    const startStreaming = () => {
        if (selectedOptions.pointCloud) {
            setPointCloudSocket(connectWebSocket("pointcloud-stream"));
        }
        if (selectedOptions.intensity) {
            setIntensitySocket(connectWebSocket("intensity-stream"));
        }
    };

    // function to stop streaming and close the WebSocket connection
    const stopStreaming = () => {
        if (pointCloudSocket) {
            pointCloudSocket.close();
        }

        if (intensitySocket) {
            intensitySocket.close();
        }
    };
    
    const handleCamSettings = () => {
        onCamSettingChange();
    };

    return (
        <>
        <div className='stream-modal-content'>
            <div>
                <h4>Stream</h4>
            </div>
            <div className='close-button'>
                <CloseOutlined onClick={onClose}></CloseOutlined>
            </div>
            <div style={{marginTop:10}}>
                <Checkbox onChange={onChange}>Point Cloud</Checkbox>
            </div>
            <div>
                <Checkbox onChange={onChange}>Intensity</Checkbox>
            </div>
            <div>
                <Checkbox onChange={onChange}>Depth</Checkbox>
            </div>
            <div className='btn'>
                <Button  type='primary' onClick={startStreaming}>Start</Button>
                <Button style={{ marginLeft: '10px', marginTop: '20px'}} onClick={stopStreaming} danger>Stop</Button>
            </div>
            <div>
                <Button type='primary' style={{marginTop:'20px'}} onClick={handleCamSettings}>Change camera settings</Button>
            </div>
            
        </div>
        </>
    );
};

export default StreamOptionModal;