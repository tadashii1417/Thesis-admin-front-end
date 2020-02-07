import React, {Component} from "react";
import styles from './Dashboard.module.css';
import IntroduceRow from "./IntroduceRow";
import {Row} from "antd";
import MainChart from "../../components/MainChart/MainChart";

class Dashboard extends Component {
    render() {
        return (
            <div className={styles.dashboard}>
                <IntroduceRow/>
                <Row gutter={24}>
                    <MainChart/>
                </Row>
            </div>
        );
    }
}

export default Dashboard;