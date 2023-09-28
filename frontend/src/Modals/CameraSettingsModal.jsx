import { Checkbox, Button, Radio, InputNumber} from 'antd';
import React, { useState} from 'react';
import { CloseOutlined } from '@ant-design/icons';
import '../CSS/CamSettingsModal.css'

const CameraSettingsModal = ({open, onClose, onSet}) => {
    if (!open) return null;

    const setCamChange = () => {
        onSet();
    };

    return (
        <>
            <div className='cam-setting-modal-content'>
                <h3>Configure camera settings</h3>
                <div className='close-button'>
                    <CloseOutlined onClick={onClose}></CloseOutlined>
                </div>
                <div style={{marginTop:"20px"}}>
                    <h5>Environment: </h5>
                    <Radio.Group>
                        <Radio.Button>Indoor</Radio.Button>
                        <Radio.Button>Outdoor</Radio.Button>
                    </Radio.Group>
                </div>
                <div style={{marginTop:"10px"}}>
                    <h5>FPS: </h5>
                    <InputNumber min={5} max={50} defaultValue={10} />
                </div>
                <div style={{marginTop:"10px"}}>
                    <h5>Config Type: </h5>
                    <Radio.Group>
                        <Radio.Button>Balanced</Radio.Button>
                        <Radio.Button>Speed</Radio.Button>
                        <Radio.Button>High Accuracy</Radio.Button>
                    </Radio.Group>
                </div>
                <div style={{marginTop:"10px"}}>
                    <h5>Integration Time: </h5>
                    <Radio.Group>
                        <Radio.Button>Short</Radio.Button>
                        <Radio.Button>Medium</Radio.Button>
                        <Radio.Button>Long</Radio.Button>
                    </Radio.Group>
                </div>
                <div style={{marginTop:"20px"}}>
                    <Button type='primary' style={{ marginTop: '20px' }} onClick={setCamChange}>
                        set
                    </Button>
                </div>
            </div>
        </>
    );
};

export default CameraSettingsModal;