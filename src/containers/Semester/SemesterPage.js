import React, {Component} from "react";
import styles from './Semester.module.css';
import {Breadcrumb, Card, Icon} from "antd";
import {Link} from "react-router-dom";
import SemesterDetail from "../../components/Semester/Semester";

class SemesterPage extends Component {
    render() {
        return (
            <React.Fragment>
                <div className={styles.header}>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to={"/"}><Icon type="home"/></Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>Semester</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className={styles.heading}>
                        Semester
                    </div>
                    <div className={styles.description}>
                        This page allow admin to manipulate with course semester: create, update, delete semester.
                    </div>
                </div>
                <div className={styles.mainForm}>
                    <Card bordered={false}>
                        <SemesterDetail/>
                    </Card>
                </div>
            </React.Fragment>
        );
    }

}

export default SemesterPage;