import React from "react";
import {Breadcrumb, Button, Divider, Typography} from "antd";
import styles from './Quiz.module.css';
import {Link} from "react-router-dom";

const {Title} = Typography;
export default function (props) {
    return (
        <div className="adminContent">
            <Breadcrumb>
                <Breadcrumb.Item>
                    <Link to={"/courses"}>Courses</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>{"HTLML CSS COURSE"}</Breadcrumb.Item>
                <Breadcrumb.Item>{"First test"}</Breadcrumb.Item>
            </Breadcrumb>
            <Title level={4}>Quiz Entrance</Title>
            <Button type={"primary"} icon={"setting"} className="iconEdit">Edit Setting</Button>
            <Divider/>
            <div className={styles.quizContainer}>
                <h4>Description</h4>
                <Divider className={styles.divider}/>
                <div className={styles.introduction}>Simple quiz description: Focus on basis syntax and control
                    statement !
                </div>
                <br/><br/>
                <h4>Quiz Information</h4>
                <Divider className={styles.divider}/>
                <div className={styles.quizInfo}>
                    <div>This quiz open at: Thursday, 10 October 2019, 11:06 AM</div>
                    <div>Time limit: 20 minutes</div>
                    <div>
                        <Link to={"/course/edit-question"}>
                            <Button type={"primary"}>Edit questions</Button>
                        </Link>
                    </div>
                </div>

            </div>
        </div>

    );
}