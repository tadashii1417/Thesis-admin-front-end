import React from "react";

export default function ({percent}) {
    return (
        <div
            className="ant-progress ant-progress-line ant-progress-show-info ant-progress-default">
            <div className="ant-progress-outer">
                <div className="ant-progress-inner">
                    <div className="ant-progress-bg"
                         style={{
                             width: percent + '%',
                             height: '8px'
                         }}
                    />
                </div>
            </div>
            <span className="ant-progress-text" title={percent + '%'}>{percent} %</span>
        </div>
    );
}
