import React from "react";
import {Row, Col, Icon} from 'antd';
import ChartCard from "../../components/ChartCard/ChartCard";
import VisitsChart from "../../components/MiniChart/VisitsChart/VisitsChart";

const topColResponsiveProps = {
    xs: 24,
    sm: 12,
    md: 12,
    lg: 12,
    xl: 6,
    style: {marginBottom: 24},
};

export default function (props) {
    return (
        <Row gutter={24}>
            <Col {...topColResponsiveProps}>
                <ChartCard title={"Total Visits"}
                           totalNumber={123456}
                           subTitle={"Daily visits"}
                           icon={<Icon type="flag" theme="twoTone" />}
                           subNumber={123}>
                    <VisitsChart/>
                </ChartCard>
            </Col>
            <Col {...topColResponsiveProps}>
                <ChartCard title={"Total Sales"}
                           totalNumber={1.456}
                           subTitle={"Daily sale"}
                           icon={<Icon type="shopping" theme="twoTone" />}
                           subNumber={12}>
                    <VisitsChart/>
                </ChartCard>
            </Col>
            <Col {...topColResponsiveProps}>
                <ChartCard title={"Total Students"}
                           totalNumber={123.456}
                           subTitle={"New student"}
                           icon={<Icon type="edit" theme="twoTone" />}
                           subNumber={123}>
                    <VisitsChart/>
                </ChartCard>
            </Col>
            <Col {...topColResponsiveProps}>
                <ChartCard title={"Total Courses"}
                           totalNumber={16}
                           subTitle={"Daily visits"}
                           icon={<Icon type="video-camera" theme="twoTone" />}
                           subNumber={123}>
                    <VisitsChart/>
                </ChartCard>
            </Col>
        </Row>

    );

}