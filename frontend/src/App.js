import React, {useState} from 'react';
import Navbar from './Components/NavBar';
import DiscoverCamModal from './Modals/DiscoverCamerasModal'
import StreamOptionModal from './Modals/StreamOptionModal'
import { Button, message } from 'antd';

const App = () => {
    const [OpenDiscoverCamModal, setOpenDiscoverCamModal] = useState(false)
    const [OpenStreamOptionModal, setStreamOptionModal] = useState(false)
    const [openFindCamButton, setFindCamButton] = useState(false)

    const handleDiscoverCamConnect = () => {
        setOpenDiscoverCamModal(false);
        setStreamOptionModal(true);
    }

    //function to display the find camera button after closing the stream option window
    const handleStreamDisconnect = () => {
        setFindCamButton(true);
        setStreamOptionModal(false);
    }

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
        <StreamOptionModal open={OpenStreamOptionModal} onClose={handleStreamDisconnect}></StreamOptionModal> 
        : null}

        </>
    );
}

export default App;