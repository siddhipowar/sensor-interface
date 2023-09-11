import React, {useState} from 'react';
import { Button, Select, Modal } from 'antd';


export default function DiscoverCameraComponent() {
    const [cameras, setCameras] = useState([]);
    const [showCameraList, setShowCameraList] = useState(false);
    const [cameraConnected, setCameraConnected] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const camerasList = [
        {
            "value": "2020045",
            "label": "Random Camera"
        },
        {
            "value": "2020046",
            "label": "Siddhi's Camera"
        },
        {
            "value": "2020047",
            "label": "Tanmay's Camera"
        }
    ]

    const [selectedCamera, setSelectedCamera] = useState(camerasList[0]);
    function handleCameraChange(e) {
        console.log(e, "value")
        setSelectedCamera(e.target.value)
    }

    const handleDiscoverCameras = async () => {
        setIsModalVisible(true);
        try {
          // Perform the camera fetching logic here using fetchCameras
          await fetchCameras();
        } catch (error) {
          // Handle errors if necessary
          console.error('Error fetching cameras:', error);
        }
      }

      
    //fetch the list of available cameras
    const fetchCameras = async () => {
        try {
            const response = await fetch('http://localhost:8001/discover-cameras');
            if(response.ok){
                const data = await response.json();
                let newData = []
                data.map(v => {
                    newData.push({"value": v["cam_serial"], "label": v["cam_info"]})
                })
                setCameras(newData);
                setShowCameraList(true);
            }else{
                console.error('Failed to fetch cameras:', response.statusText);
            }
        }
        catch (error) {
            console.error('Error fetching cameras', error);
        }
    }

    async function connectSelectedCamera() {
        try{
            let url =`http://localhost:8001/connect-to-camera?serial=${selectedCamera["cam_serial"]}`
            const response = await fetch(url, { method: "POST", headers: {
                'Content-Type': 'application/json'}});
            if(response.ok){
                const data = await response.json();
                console.log(data)
                setCameraConnected(true)
            }

        }
        catch (error) {
            console.error('Error fetching cameras', error);
        }
        setCameraConnected(true)
    }
    return (
    <div style={{ paddingTop: 16 }}>
        <div style={{ paddingTop: '16px' }}>
            <h4>Connect to a camera</h4>
            <Button onClick={handleDiscoverCameras}>Find Cameras</Button>
        </div>
      <Modal
        title="Available Cameras"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={connectSelectedCamera}
      >
        <Select
          style={{
            width: '100%',
          }}
          options={setCameras}
          onChange={handleCameraChange}
          value={selectedCamera}
        />
      </Modal>
      {cameraConnected && <b>Camera Connected</b>}
    </div>
    )
    
};

