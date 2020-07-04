import React from "react";
import {
    Chart,
    Geom,
    Axis,
    Tooltip,
} from "bizcharts";

class BarChart extends React.Component {
    render() {

        const cols = {
            count: {
                tickInterval: 1
            }
        };
        return (
            <div>
                <Chart height={400} data={this.props.data} scale={cols} forceFit>
                    <Axis name="Score range"/>
                    <Axis name="count"/>
                    <Tooltip
                        crosshairs用于设置 tooltip 的辅助线或者辅助框
                        crosshairs={{
                         type: "y"
                        }}
                    />
                    <Geom type="interval" position="range*count"/>
                </Chart>
            </div>
        );
    }
}

export default BarChart;
