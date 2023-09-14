// import React, {useEffect, useState} from 'react';
import { Checkbox } from 'antd';
import React from 'react';
import { CloseOutlined } from '@ant-design/icons';

const StreamOptionModal = ({open, onClose}) => {
    if (!open) return null;

    const onChange = (e) => {
        console.log('checked = ${e.target.checked}');
    };

    return(
        <>
        <div>
            <div>
                <h5>Stream</h5>
            </div>
            <div>
                <CloseOutlined onClick={onClose}></CloseOutlined>
            </div>
            <div>
                <Checkbox onChange={onChange}>Point Cloud</Checkbox>
                <Checkbox onChange={onChange}>Intensity</Checkbox>
            </div>
        </div>
        </>
    );
};

export default StreamOptionModal;