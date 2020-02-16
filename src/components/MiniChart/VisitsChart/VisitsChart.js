import React from "react";
import {Chart, Geom} from 'bizcharts';
import styles from '../MiniChart.module.css';

const data = [
    {
        year: "1951 年",
        sales: 38
    },
    {
        year: "1952 年",
        sales: 52
    },
    {
        year: "1956 年",
        sales: 61
    },
    {
        year: "1957 年",
        sales: 10
    },
    {
        year: "1958 年",
        sales: 48
    },
    {
        year: "1959 年",
        sales: 38
    },
    {
        year: "1960 年",
        sales: 38
    },
    {
        year: "1962 年",
        sales: 38
    }
];
const cols = {
    sales: {
        tickInterval: 5
    }
};
export default function (props) {
    return (
        <div className={styles.miniChart}>
            <div className={styles.charContent}>
                <Chart height={200} data={data} scale={cols} forceFit>
                    <Geom type="interval" position="year*sales"/>
                </Chart>
            </div>
        </div>
    );

}