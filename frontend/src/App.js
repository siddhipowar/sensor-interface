import React, {useState} from 'react';
import Navbar from './Components/NavBar';
import DiscoverCamModal from './Modals/DiscoverCamerasModal'
import StreamOptionModal from './Modals/StreamOptionModal'
import CameraSettingsModal from './Modals/CameraSettingsModal'
import { Button, message } from 'antd';

const App = () => {
    const [OpenDiscoverCamModal, setOpenDiscoverCamModal] = useState(false)
    const [OpenStreamOptionModal, setStreamOptionModal] = useState(false)
    const [openFindCamButton, setFindCamButton] = useState(false)
    const [openCameraSettingsModal, setCameraSettingsModal] = useState(false)

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

    // Function to disconnect from camera when stream option modal is closed
    const disconnectFromCamera = async () => {
        try {
            const response = await fetch('http://localhost:8001/disconnect-camera', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data.message);
            }
            else {
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
        <StreamOptionModal open={OpenStreamOptionModal} onClose={handleStreamDisconnect} onCamSettingChange={handleCamSettings}></StreamOptionModal> 
        : null}

        {OpenStreamOptionModal ? 
        <CameraSettingsModal open={openCameraSettingsModal} onSet={handleCamSettingsSet} onClose={handleCamSettingsClose}></CameraSettingsModal> 
        : null}

        </>
    );
}

export default App;