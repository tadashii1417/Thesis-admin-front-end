import React, {Component} from "react";
import {Card, Input, Form, Upload, Button} from 'antd';
import styles from './NewCourse.module.css';
import PublicCard from "../../components/CourseSettings/PublicCard";
import Curriculum from "./CurriculumCreation/Curriculum";

const {Meta} = Card;
const {TextArea} = Input;
export default class extends Component {
    render() {
        return (
            <div className={styles.content}>
                <div className={styles.contentLeft}>
                    <Card title="Add New Course !">
                        <Form layout="vertical">
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
                    </Card>

                    <Card title="Curriculum" size="small">
                        <Curriculum/>
                    </Card>

                </div>
                <div className={styles.contentRight}>
                    <PublicCard/>
                    <Card size="small"
                          actions={[<Upload><Button type="primary">Upload</Button></Upload>]}
                          cover={<img alt="example" src="https://i.udemycdn.com/course/240x135/24823_963e_14.jpg"/>}>
                        {/* <Meta title="Course Image"/> */}
                        <h4>Course image</h4>
                    </Card>
                    <Card size="small"
                          actions={[<Upload><Button type="primary">Save</Button></Upload>]}
                          cover={<iframe title="promotional video" src="https://www.youtube.com/embed/9oViNcxFF5g"/>}>
                        {/* <Meta title="Promotional Videos"/> */}
                        <h4>Promotional video</h4>
                        <Input placeholder="new video url"/>
                    </Card>
                </div>
            </div>);
    }
}
