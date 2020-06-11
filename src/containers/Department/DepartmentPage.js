import React, {Component} from "react";
import styles from './DepartmentPage.module.css';
import {Breadcrumb, Card, Icon} from "antd";
import {Link} from "react-router-dom";
import DepartmentDetail from "../../components/DepartmentDetail/DepartmentDetail";

class DepartmentPage extends Component {
    render() {
        return (
            <React.Fragment>
                <div className={styles.header}>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to={"/"}><Icon type="home"/></Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>Departments</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className={styles.heading}>
                        Departments
                    </div>
                    <div className={styles.description}>
                        This page allow admin to create, update and manipulate departments of the center.
                    </div>
                </div>

                <div className={styles.mainForm}>
                    <Card bordered={false}>
                        <DepartmentDetail/>
                    </Card>
                </div>
            </React.Fragment>
        );
    }

}

export default DepartmentPage;
