import { Button , Select, message} from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import React, { useEffect , useState} from 'react';
import axios from 'axios';
import '../CSS/DiscoverCamModal.css'

const DiscoverCamModal = ({open, onClose, onConnect}) => {
    const [cameras, setCameras] = useState([]); //state to store cameras
    const [selectedCamera, setSelectedCamera] = useState(null);
    // const [OpenStreamOptionModal, setOpenStreamOptionModal] = useState(false);
    
    useEffect(() => {
        if (open) {
            // Fetch the list of cameras when the modal in open
            axios.get('http://localhost:8001/discover-cameras')
            .then((response) => {
                setCameras(response.data);
            }
            )
            .catch((error) => {
                console.error('Error fetching cameras', error);
                message.error('Another application has exclusive access');
            }
            );
        }
    }, [open]);

    const handleConnect = () => {
        if (selectedCamera) {
            axios
            .post('http://localhost:8001/connect-to-camera', {serial: selectedCamera})
            .then((response) => {
                console.log(response.data.message);
                onConnect();
            }
            )
            .catch((error) => {
                console.error('Error connecting to camera', error);
            }
            );
        }
    }

    if (!open) return null

    return(
        <div title="Discovered cameras" onCancel={onClose}>
            <div className="modal-content">
                <div>
                    <h5>Discovered Cameras:</h5>
                </div>
                <div>
                    <CloseOutlined onClick={onClose} className='closeBtn'/>
                </div>
                <div style={{marginTop:20}} className='select-container'>
                    <Select placeholder="Select a camera" style={{ width: '100%' }} onChange={(value) => setSelectedCamera(value)}>
                        {cameras.map((camera) => (
                        <Select.Option key={camera.cam_serial} value={camera.cam_serial}>
                            {camera.cam_serial}
                        </Select.Option>
                        ))}
                    </Select>
                </div>
                <div className='connect-button'>
                    <Button type='primary' style={{marginRight:20}} onClick={handleConnect}>Connect</Button>
                </div>
            </div>
        </div>
    );
};


export default DiscoverCamModal;