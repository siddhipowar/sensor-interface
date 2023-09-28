import {Button, Radio, InputNumber} from 'antd';
import React, { useState} from 'react';
import { CloseOutlined } from '@ant-design/icons';
import '../CSS/CamSettingsModal.css'

const CameraSettingsModal = ({open, onClose, onSet}) => {
    const [valueEnv, setValueEnv] = useState('Indoor');
    const [valueCnfTyp, setValueCnfTyp] = useState('Balanced');
    const [valueIntegrationTime, setIntegrationTime] = useState('Medium');
    const [valueFPS, setFPS] = useState('30');

    if (!open) return null;

    const Environment = [
        { label: 'Indoor', value: 'Indoor' },
        { label: 'Outdoor', value: 'outdoor' }
    ];
    const ConfigType = [
        { label: 'Balanced', value: 'Balanced' },
        { label: 'Speed', value: 'Speed' },
        { label: 'High Accuracy', value: 'High Accuracy' }
    ];
    const IntegrationTime = [
        { label: 'Short', value: 'Short' },
        { label: 'Medium', value: 'Medium' },
        { label: 'Long', value: 'Long' }
    ];
       
    const onChangeEnv = ({ target: { value } }) => {
        console.log('Environment checked', value);
        setValueEnv(value);
    }
    const onChangeCnfTyp = ({ target: { value } }) => {
        console.log('Config type checked', value);
        setValueCnfTyp(value);
    }
    const onChangeIntegrationTime = ({ target: { value } }) => {
        console.log('Integration Time checked', value);
        setIntegrationTime(value);
    }
    const onChangeFPS = (value) => {
        console.log('FPS Changed', value);
        setFPS(value);
    }

    const setCamConfigChange = () => {
        console.log({
            "valueEnv": valueEnv,
            "valueConfigType": valueCnfTyp,
            "fps": valueFPS,
            "integrationTime": valueIntegrationTime 
        })
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
                    <Radio.Group 
                    options={Environment}
                    value={valueEnv}
                    onChange={onChangeEnv}
                    optionType="button"
                    buttonStyle="solid"/>  
                </div>
                <div style={{marginTop:"10px"}}>
                    <h5>FPS: </h5>
                    <InputNumber min={5} max={50} defaultValue={valueFPS} value={valueFPS} 
                    onChange={onChangeFPS}/>
                </div>
                <div style={{marginTop:"10px"}}>
                    <h5>Config Type: </h5>
                    <Radio.Group 
                    options={ConfigType}
                    value={valueCnfTyp}
                    onChange={onChangeCnfTyp}
                    optionType="button"
                    buttonStyle="solid"/> 
                </div>
                <div style={{marginTop:"10px"}}>
                    <h5>Integration Time: </h5>
                    <Radio.Group 
                    options={IntegrationTime}
                    value={valueIntegrationTime}
                    onChange={onChangeIntegrationTime}
                    optionType="button"
                    buttonStyle="solid"/>
                </div>
                <div style={{marginTop:"20px"}}>
                    <Button type='primary' style={{ marginTop: '20px' }} onClick={setCamConfigChange}>
                        set
                    </Button>
                </div>
            </div>
        </>
    );

};

export default CameraSettingsModal;