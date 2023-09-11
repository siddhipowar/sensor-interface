import { Button , Select} from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import React from 'react';

const DiscoverCamModal = ({open, onClose}) => {
    if (!open) return null
  return(
    <div>
        <div className="modalContainer">
            <h4>Discovered Cameras:</h4>
            <div>
                <CloseOutlined onClick={onClose} className='closeBtn'/>
            </div>
            <div>
                <select>
                    options={}
                </select>
            </div>
            <div style={{paddingLeft:90}}>
                <Button type='primary' style={{marginRight:20}}>Connect</Button>
            </div>
        </div>
    </div>
  );
};


export default DiscoverCamModal;