import React, {useState} from 'react';
import Navbar from './Components/NavBar';
import DiscoverCamModal from './Modals/DiscoverCamerasModal'
import StreamOptionModal from './Modals/StreamOptionModal'
import CameraSettingsModal from './Modals/CameraSettingsModal'
import PointCloudRenderer from './Modals/PointCloudRenderer';
import { Button, message } from 'antd';
import axios from 'axios';

const App = () => {
    const [OpenDiscoverCamModal, setOpenDiscoverCamModal] = useState(false)
    const [OpenStreamOptionModal, setStreamOptionModal] = useState(false)
    const [openFindCamButton, setFindCamButton] = useState(false)
    const [openCameraSettingsModal, setCameraSettingsModal] = useState(false)
    const [XYZBinaryData, setXYZBinaryData] = useState([])
    const [imageData, setFrameData] = useState(null);


    const handleDiscoverCamConnect = () => {
        setOpenDiscoverCamModal(false);
        setStreamOptionModal(true);
    }

    //function to display the find camera button after closing the stream option window
    const handleStreamDisconnect = () => {
        setFindCamButton(true);
        setStreamOptionModal(false);
        disconnectFromCamera();
    }

    const handleCamSettings = () => {
        setCameraSettingsModal(true);
    }

    // seems repeated but might need modification later
    const handleCamSettingsSet = () => {
        setCameraSettingsModal(false);
    }

    // seems repeated but might need modification later
    const handleCamSettingsClose = () => {
        setCameraSettingsModal(false);
    }

    const handleFrameData = (frameData) => {
        console.log("sdasdsadsf", frameData)
        setFrameData(frameData)
        // Process or display the frame data here
    };
     

    // Function to disconnect from camera when stream option modal is closed
    const disconnectFromCamera = async () => {
        try {
            const response = await axios.post('http://localhost:8001/disconnect-camera', {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.status === 200) {
                console.log(response.data.message);
            } else {
                console.error('Failed to disconnect from the camera');
            }
        } catch (error) {
            console.error('An error occurred', error);
        }
    };
    
    return (
        <>

        <Navbar/>
        
        { !OpenStreamOptionModal ? 
        <Button open={openFindCamButton} onClick={() => setOpenDiscoverCamModal(true)} style={{marginTop:"20px", marginLeft:"10px"}}>Find Cameras</Button> 
        : null}

        {OpenDiscoverCamModal ? 
        <DiscoverCamModal open={OpenDiscoverCamModal} onClose={() => setOpenDiscoverCamModal(false)} onConnect = {handleDiscoverCamConnect}></DiscoverCamModal> 
        : null}

        {OpenStreamOptionModal ? 
        <StreamOptionModal open={OpenStreamOptionModal} onClose={handleStreamDisconnect} onCamSettingChange={handleCamSettings} onFrameDataReceived={handleFrameData}></StreamOptionModal> 
        : null}
        
        {OpenStreamOptionModal ? 
        <CameraSettingsModal open={openCameraSettingsModal} onSet={handleCamSettingsSet} onClose={handleCamSettingsClose}></CameraSettingsModal> 
        : null}

        {/* {XYZBinaryData.length ? 
        <PointCloudRenderer binaryData={XYZBinaryData} />
        : null } */}

        {/* <PointCloudRenderer/> */}


        </>
    );
}

export default App;