import React from 'react';
import {Spin} from 'antd';

export default (size = "default") => {
    if (Object.keys(size).length === 0 && size.constructor === Object) {
        size = "default";
    }

    return (
        <div style={{paddingTop: 50, textAlign: 'center', width: '100%'}}>
            <Spin size={size}/>
        </div>
    );
};
