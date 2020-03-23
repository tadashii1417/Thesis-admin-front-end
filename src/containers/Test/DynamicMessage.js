import React from "react";
import {Button, message} from 'antd';

const key = 'updatable';

const openMessage = () => {
    message.loading({content: 'Loading...', key});
    setTimeout(() => {
        message.success({content: 'Loaded!', key, duration: 2});
    }, 1000);
};

export default function (props) {
    return (
        <Button type="primary" onClick={openMessage}>
            Open the message box
        </Button>
    );
}

