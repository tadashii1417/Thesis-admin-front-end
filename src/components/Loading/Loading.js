import React from 'react';
import {Spin} from 'antd';

export default (size = "default") => (
    <div style={{paddingTop: 50, textAlign: 'center', width: '100%'}}>
        <Spin size={size}/>
    </div>
);
