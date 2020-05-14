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
    style: {marginBottom: 16, padding: '0 6px'},
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
                    <img
                        alt={"total sale"}
                        src={"https://st2.depositphotos.com/5266903/8132/v/950/depositphotos_81321144-stock-illustration-sales-flat-soft-blue-colors.jpg"}
                        style={{objectFit: "cover", width: "80%", height: "100%"}}
                    />
                </ChartCard>
            </Col>
            <Col {...topColResponsiveProps}>
                <ChartCard title={"Total Students"}
                           totalNumber={123.456}
                           subTitle={"New student"}
                           icon={<Icon type="edit" theme="twoTone" />}
                           subNumber={123}>
                    <img
                        alt={"total student"}
                        src={"https://img.icons8.com/bubbles/2x/student-male.png"}
                        style={{objectFit: "cover", width: "80%", height: "100%", marginLeft: "10%"}}
                    />
                </ChartCard>
            </Col>
            <Col {...topColResponsiveProps}>
                <ChartCard title={"Total Courses"}
                           totalNumber={16}
                           subTitle={"Daily visits"}
                           icon={<Icon type="video-camera" theme="twoTone" />}
                           subNumber={123}>
                    <img
                        alt={"total course"}
                        src={"https://cdn4.iconfinder.com/data/icons/got-idea-vol-2/128/education_program-512.png"}
                        style={{objectFit: "cover", width: "90%", height: "100%"}}
                    />
                </ChartCard>
            </Col>
        </Row>

    );

}