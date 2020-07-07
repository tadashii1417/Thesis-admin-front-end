import React from "react";
import {
    Chart,
    Geom,
    Axis,
    Tooltip,
} from "bizcharts";
import { Tabs } from 'antd';
import styles from './MainChart.module.css';

const { TabPane } = Tabs;
class MainChart extends React.Component {
    render() {
        const data = [
            {
                year: "January",
                sales: 38
            },
            {
                year: "February",
                sales: 52
            },
            {
                year: "March",
                sales: 61
            },
            {
                year: "April",
                sales: 145
            },
            {
                year: "May",
                sales: 48
            },
            {
                year: "June",
                sales: 38
            },
            {
                year: "July",
                sales: 38
            },
            {
                year: "August",
                sales: 38
            }
        ];
        const cols = {
            sales: {
                tickInterval: 20
            }
        };
        return (
            <Tabs type={"card"} className={styles.mainChart}>
                <TabPane tab={"Total visits"} key={"visit"}>
                    <Chart height={400} data={data} scale={cols} forceFit>
                        <Axis name="year"/>
                        <Axis name="sales"/>
                        <Tooltip
                            crosshairs={{
                                type: "y"
                            }}
                        />
                        <Geom type="interval" position="year*sales"/>
                    </Chart>
                </TabPane>
                <TabPane tab={"Total sales"} key={"sale"}>
                    Sales
                </TabPane>
            </Tabs>
        );
    }
}

export default MainChart;
