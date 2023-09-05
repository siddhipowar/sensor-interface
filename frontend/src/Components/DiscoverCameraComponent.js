import React, {useSate} from 'react';

function DiscoverCameraComponent() {
    const [cameras, setCameras] = useState([]);
    const [showCameraList, setShowCameraList] = useState(false);

    //fetch the list of available cameras
    const fetchCameras = async () => {
        try {
            const response = await fetch('/discover-cameras');
            if(response.ok){
                const data = await response.json();
                setCameras(data);
                setShowCameraList(true);
            }else{
                console.error('Failed to fetch cameras:', response.statusText);
            }
        }
        catch (error) {
            console.error('Error fetching cameras', error);
        }
    }
};

return (
    <div>
        <h2>Discover available cameras</h2>
        <button onClick={fetchCameras}>Connect</button>
        {showCameraList && (
            <div>
                <h3>Available Cameras:</h3>
                <ul>
                    {cameras.map((camera => (
                        <li key={(camera.)}
                    )))}
                </ul>
        )}
    </div>
)
