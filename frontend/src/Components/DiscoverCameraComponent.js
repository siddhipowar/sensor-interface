import React, {useState} from 'react';
import { Button, Select } from 'antd';


export default function DiscoverCameraComponent() {
    const [cameras, setCameras] = useState([]);
    const [showCameraList, setShowCameraList] = useState(false);
    const [cameraConnected, setCameraConnected] = useState(false)

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
        <div style={{paddingTop: 16}}>
            <h3>Connect to a camera</h3>
            <Button type="primary" onClick={fetchCameras} >Find Cameras</Button>
            {showCameraList && (
                <div>
                    {/* <h3>Available Cameras:</h3> */}
                    {/* <ul>
                        {cameras.map((camera => (
                            <li key={(camera['cam_serial'])}>
                                {camera['cam_serial']} : {camera['cam_info']}
                            </li>
                        )))}
                    </ul> */}
                    
                    {/* <select
                        className="form-control"
                        value={selectedCamera["cam_serial"] || null}
                        onChange={(e) => handleCameraChange(e)}
                    >
                        {camerasList.map((camera) => {
                            return <option
                            value={camera["cam_serial"]}
                            selected={selectedCamera["cam_serial"] === camera["cam_serial"]}
                            >
                            {camera["cam_info"]}
                            </option>
                        })}
                    </select> */}

                    <Select
                        defaultValue={camerasList[0]}
                        style={{
                            width: 300,
                            marginTop: 16,
                            marginRight: 8
                        }}
                        // loading
                        options={camerasList}
                        onChange={handleCameraChange}
                    />
                    <Button type="primary" onClick={connectSelectedCamera}>Connect</Button>
                    <br />
                    {cameraConnected && <b>Camera Connected</b>}
                </div>
            )}
        </div>
    )
    
};

