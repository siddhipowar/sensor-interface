import React, {useState} from 'react';
import DiscoverCameraComponent from './Components/DiscoverCameraComponent';
import Navbar from './Components/NavBar';
import DiscoverCamModal from './Modals/DiscoverCamerasModal'
import { Button } from 'antd';

const App = () => {
    const [OpenModal, setOpenModal] = useState(false)
    return (
        <>
        <Navbar/>
        {/* <DiscoverCameraComponent/> */}
        <Button onClick={() => setOpenModal(true)} style={{marginTop:"20px"}}>Find Cameras</Button>
        <DiscoverCamModal open={OpenModal} onClose={() => setOpenModal(false)}></DiscoverCamModal>
        </>
    );
}

export default App