import React, {Component} from "react";
import {Card, Input, Form, Upload, Button, Tabs, Icon, Typography, Divider} from 'antd';
import styles from './NewCourse.module.css';
import PublicCard from "../../components/CourseSettings/PublicCard";
import Curriculum from "./CurriculumCreation/Curriculum";
import GeneralSetting from "../../components/CourseSettings/GeneralSetting";

const {Meta} = Card;
const {TextArea} = Input;
const {TabPane} = Tabs
const {Title} = Typography;

export default class extends Component {
    render() {
        return (
            <div className={"adminContent"}>
                <Title level={4} >Course Setting</Title>
                <Divider/>
                <Tabs defaultActiveKey="1" tabPosition={"left"}>
                    <TabPane
                        tab={<span><Icon type="home" theme={"twoTone"}/>Basic Information</span>}
                        key="1">
                        <Form>
                            <Form.Item label="Course Title" style={{padding: 0, marginBottom: "10px"}} required>
                                <Input/>
                            </Form.Item>
                            <Form.Item label="Description" style={{padding: 0, marginBottom: "10px"}} required>
                                <TextArea style={{height: "80px"}}/>
                            </Form.Item>
                            <Form.Item label="Learning Outcome" style={{padding: 0, marginBottom: "10px"}} required>
                                <TextArea style={{height: "80px"}}/>
                            </Form.Item>
                            <Form.Item label="Requirements" style={{padding: 0, marginBottom: "10px"}}
                                       required>
                                <TextArea style={{height: "80px"}}/>
                            </Form.Item>
                        </Form>
                    </TabPane>

                    <TabPane
                        tab={<span><Icon type="setting" theme={"twoTone"}/>General Settings</span>}
                        key="2">
                        <GeneralSetting/>
                    </TabPane>

                    <TabPane
                        tab={<span><Icon type="database" theme={"twoTone"}/>Course Curriculum</span>}
                        key="3">
                        <Curriculum/>
                    </TabPane>

                    <TabPane
                        tab={<span><Icon type="picture" theme={"twoTone"}/>Course Banner</span>}
                        key="4">
                        <img className={styles.imgBanner} alt="example" src="https://cdn7.allevents.in/banners/cc3b0720-e965-11e9-8061-8f22b3fe5a8a-rimg-w1200-h600-gmir.jpg?v=1570495904"/>
                    </TabPane>

                    <TabPane
                        tab={<span><Icon type="sound" theme={"twoTone"}/>Promotional Video</span>}
                        key="5">
                        <Card size="small"
                              actions={[<Upload><Button type="primary">Save</Button></Upload>]}
                              cover={<iframe title="promotional video"
                                             src="https://www.youtube.com/embed/9oViNcxFF5g" width="560" height="349"/>}>
                            <h4>Promotional video</h4>
                            <Input placeholder="new video url"/>
                        </Card>
                    </TabPane>

                </Tabs>
            </div>);
    }
}
