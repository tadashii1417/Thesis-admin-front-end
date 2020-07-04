import React from 'react';
import {
    Chart,
    Geom,
    Axis,
    Tooltip,
    Coord,
    Label,
    Legend,
} from 'bizcharts';
import DataSet from '@antv/data-set';

class PieChart extends React.Component {
    render() {
        const {data} = this.props;
        const {DataView} = DataSet;

        const dv = new DataView();
        dv.source(data).transform({
            type: 'percent',
            field: 'count',
            dimension: 'item',
            as: 'percent',
        });
        const cols = {
            percent: {
                formatter: val => {
                    val = Number(val * 100).toFixed(2) + '%';
                    return val;
                },
            },
        };

        function getXY(c, {index: idx = 0, field = 'percent', radius = 0.5}) {
            const d = c.get('data');
            if (idx > d.length) return;
            const scales = c.get('scales');
            let sum = 0;
            for (let i = 0; i < idx + 1; i++) {
                let val = d[i][field];
                if (i === idx) {
                    val = val / 2;
                }
                sum += val;
            }
            const pt = {
                y: scales[field].scale(sum),
                x: radius,
            };
            const coord = c.get('coord');
            return coord.convert(pt);
        }

        return (
            <div>
                <Chart
                    height={window.innerHeight}
                    data={dv}
                    scale={cols}
                    padding={[80, 100, 80, 80]}
                    forceFit
                    onGetG2Instance={c => {
                        const xy = getXY(c, {index: 0});
                        c.showTooltip(xy);
                    }}
                >
                    <Coord type="theta" radius={0.75}/>
                    <Axis name="percent"/>
                    <Legend
                        position="right"
                        offsetY={-window.innerHeight / 2 + 200}
                    />
                    <Tooltip
                        showTitle={false}
                        itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
                    />
                    <Geom
                        type="intervalStack"
                        position="percent"
                        color="item"
                        tooltip={[
                            'item*percent',
                            (item, percent) => {
                                percent = percent * 100 + '%';
                                return {
                                    name: item,
                                    value: percent,
                                };
                            },
                        ]}
                        style={{
                            lineWidth: 1,
                            stroke: '#fff',
                        }}
                    >
                        <Label
                            content="percent"
                            formatter={(val, item) => {
                                return item.point.item + ': ' + val;
                            }}
                        />
                    </Geom>
                </Chart>
            </div>
        );
    }
}

export default PieChart;
