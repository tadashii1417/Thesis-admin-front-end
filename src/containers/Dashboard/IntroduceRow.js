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
                        src={"https://i.pinimg.com/originals/61/41/e7/6141e701c93cb9522fa121d3a3d0fd94.jpg"}
                        style={{objectFit: "cover", width: "100%", height: "100%"}}
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
                        src={"https://webstockreview.net/images/conversation-clipart-grouping-2.png"}
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
                        src={"https://pngimage.net/wp-content/uploads/2018/06/%D1%83%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5-png-5.png"}
                        style={{objectFit: "cover", width: "100%", height: "100%"}}
                    />
                </ChartCard>
            </Col>
        </Row>

    );

}