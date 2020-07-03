import React from "react";
import {DatePicker, Form, Input, Switch} from "antd";
import config from "../../../config";
import moment from "moment";


class LivestreamInfo extends React.Component {
    render() {
        const {data} = this.props;
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 10},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 14},
            },
        };
        return (
            <Form layout="vertical" {...formItemLayout} hideRequiredMark>
                <Form.Item label="Allow recording">
                    <Switch checked={data.record}/>
                </Form.Item>

                <Form.Item label="Auto start recording">
                    <Switch checked={data.autoStartRecording}/>
                </Form.Item>

                <Form.Item label="Allow start/stop recording">
                    <Switch checked={data.allowStartStopRecording}/>
                </Form.Item>

                <Form.Item label="Max participants">
                    <Input type="number" style={{width: '100px'}} value={data.maxParticipants}/>
                </Form.Item>

                <Form.Item label="Expect start time">
                    <DatePicker showTime
                                value={moment(data.expectedStartAt, config.timeFormat)}
                                placeholder="Select Start Time"
                                format={config.timeFormat}/>
                </Form.Item>
            </Form>
        );
    }
}


export default LivestreamInfo;
