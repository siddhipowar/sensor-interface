// import React, {useEffect, useState} from 'react';
import { Checkbox } from 'antd';
import React from 'react';
import { CloseOutlined } from '@ant-design/icons';
import '../CSS/StreamOptionModal.css'

const StreamOptionModal = ({open, onClose}) => {
    if (!open) return null;

    // function for checkbox selection
    const onChange = (e) => {
        console.log('checked = ${e.target.checked}');
    };

    return (
        <>
        <div className='stream-modal-content'>
            <div>
                <h4>Stream</h4>
            </div>
            <div className='close-button'>
                <CloseOutlined onClick={onClose}></CloseOutlined>
            </div>
            <div style={{marginTop:10}}>
                <Checkbox onChange={onChange}>Point Cloud</Checkbox>
                <Checkbox onChange={onChange}>Intensity</Checkbox>
            </div>
        </div>
        </>
    );
};

export default StreamOptionModal;