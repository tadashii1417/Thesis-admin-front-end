import React, {Component} from "react";
import {
    Card,
    Upload,
    Button,
    Tabs,
    Icon,
    Breadcrumb,
    message,
    Spin,
    Result, Avatar
} from 'antd';
import styles from './CourseDetail.module.css';
import Curriculum from "./Curriculum/Curriculum";
import {Link} from "react-router-dom";
import {httpErrorHandler} from "../../utils/axios_util";
import axios from '../../config/axios-config';
import CourseSettings from "../../components/CourseSettings/CourseSettings";
import './CourseDetail.css';
import {updateCourse, updateCourseBanner} from "../../services/course_service";
import {ServerErrors} from "../../constants/server_error_constant";
import DynamicIcon from "../../components/DynamicIcon/DynamicIcon";

// TODO: Create lazy loading for tab panel

const {TabPane} = Tabs;

export default class extends Component {
    state = {
        data: null,
        loading: true
    };

    async componentDidMount() {
        const {slug} = this.props.match.params;
        try {
            const {data} = await axios.get('/api/courses/' + slug);
            this.setState({data: data, loading: false})
        } catch (e) {
            httpErrorHandler(e, () => {
                switch (e.code) {
                    default:
                        message.error("Something went wrong");
                }
            })
        }
    }

    handleUpdateCourse = async (patch) => {
        try {
            const {data} = await updateCourse(this.state.data.id, patch);
            message.success("Course has been updated");
            this.setState({data: data});
        } catch (e) {
            httpErrorHandler(e, () => {
                switch (e.code) {
                    case ServerErrors.INVALID_PATCH_DATA:
                        message.error("Invalid input");
                        break;
                    default:
                        message.error("Something went wrong");
                }
            })
        }
    };

    handleUpdateBanner = async (file) => {
        try {
            const {data} = await updateCourseBanner(this.state.data.id, file);
            message.success("Course banner has been updated");
            this.setState({data: data});
        } catch (e) {
            httpErrorHandler(e, () => {
                switch (e.code) {
                    default:
                        message.error("Something went wrong");
                }
            })
        }
    };

    courseIcon = () => (
        <svg id="Layer_1" enableBackground="new 0 0 512 512" height="20" viewBox="0 0 512 512" width="20"
             xmlns="http://www.w3.org/2000/svg">
            <g>
                <g>
                    <path
                        d="m307.09 478.87c-1.41 1.96-3.67 3.13-6.09 3.13h-90c-2.42 0-4.68-1.17-6.09-3.13s-1.79-4.48-1.02-6.77l20-59.35c1.03-3.05 3.89-5.11 7.11-5.11h50c3.22 0 6.08 2.06 7.11 5.11l20 59.35c.77 2.29.39 4.81-1.02 6.77z"
                        fill="#a8b3ba"/>
                    <path
                        d="m307.09 478.87c-1.41 1.96-3.67 3.13-6.09 3.13h-30.05c2.41 0 4.68-1.17 6.09-3.13s1.79-4.48 1.02-6.77l-20-59.35c-1.03-3.05-3.89-5.11-7.11-5.11h30.05c3.22 0 6.08 2.06 7.11 5.11l20 59.35c.77 2.29.39 4.81-1.02 6.77z"
                        fill="#879299"/>
                    <path
                        d="m512 105.79v281.67c0 19.4-15.78 35.18-35.18 35.18h-441.64c-19.4 0-35.18-15.78-35.18-35.18v-281.67c0-19.4 15.78-35.19 35.18-35.19h441.64c19.4 0 35.18 15.79 35.18 35.19z"
                        fill="#555760"/>
                    <path
                        d="m512 105.79v281.67c0 19.4-15.78 35.18-35.18 35.18h-37.48c19.43 0 35.18-15.75 35.18-35.18v-281.67c0-19.44-15.75-35.19-35.18-35.19h37.48c19.4 0 35.18 15.79 35.18 35.19z"
                        fill="#36383f"/>
                    <path d="m37.476 108.105h437.048v277.036h-437.048z" fill="#eef6ff"/>
                    <path d="m444.524 108.105h30v277.036h-30z" fill="#dae6ef"/>
                    <path
                        d="m351.99 489.47c0 12.45-10.08 22.53-22.48 22.53h-147.02c-12.4 0-22.48-10.08-22.48-22.47 0-12.45 10.08-22.53 22.48-22.53h147.02c12.4 0 22.48 10.08 22.48 22.47z"
                        fill="#555760"/>
                    <path
                        d="m351.99 489.47c0 12.45-10.08 22.53-22.48 22.53h-30c12.4 0 22.48-10.08 22.48-22.53 0-12.39-10.08-22.47-22.48-22.47h30c12.4 0 22.48 10.08 22.48 22.47z"
                        fill="#36383f"/>
                </g>
                <path
                    d="m366.89 251.24c0 2.67-1.41 5.14-3.72 6.49l-103.39 60.38c-1.17.68-2.47 1.02-3.78 1.02s-2.61-.34-3.78-1.02l-103.39-60.38c-2.31-1.35-3.72-3.82-3.72-6.49l.19-104.71c0-4.14 3.36-7.49 7.5-7.49h206.4c4.14 0 7.5 3.35 7.5 7.49z"
                    fill="#555760"/>
                <path
                    d="m366.89 251.24c0 2.67-1.41 5.14-3.72 6.49l-103.39 60.38 78.37-60.38c1.77-1.35 2.85-3.82 2.85-6.49l-.14-104.71c-.01-4.14-2.58-7.49-5.75-7.49h24.09c4.14 0 7.5 3.35 7.5 7.49z"
                    fill="#36383f"/>
                <path
                    d="m396.949 124.56v77.598c0 2.608 2.114 4.722 4.722 4.722h20.296c2.608 0 4.722-2.114 4.722-4.722v-94.968z"
                    fill="#36383f"/>
                <path
                    d="m434.19 107.19c0 2.67-1.42 5.13-3.72 6.48l-170.69 99.69c-1.17.68-2.47 1.02-3.78 1.02s-2.61-.34-3.78-1.02l-170.69-99.69c-2.3-1.35-3.72-3.81-3.72-6.48s1.42-5.13 3.72-6.48l170.69-99.69c2.33-1.36 5.23-1.36 7.56 0l170.69 99.69c2.3 1.35 3.72 3.81 3.72 6.48z"
                    fill="#52deff"/>
                <path
                    d="m434.19 107.19c0 2.67-1.42 5.13-3.72 6.48l-170.69 99.69 128.4-99.69c1.75-1.35 2.82-3.81 2.82-6.48s-1.07-5.13-2.82-6.48l-128.4-99.69 170.69 99.69c2.3 1.35 3.72 3.81 3.72 6.48z"
                    fill="#55baff"/>
            </g>
        </svg>
    );

    render() {
        const {data, loading} = this.state;
        if (loading) {
            return <Spin/>
        }

        return (
            <React.Fragment>
                <div className={styles.headerContainer}>
                    <div className={styles.header}>
                        <Breadcrumb>
                            <Breadcrumb.Item>
                                <Link to={"/courses"}> <Icon type={'home'} style={{marginRight: '7px'}}/>
                                    Courses</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>{data.name}</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className={styles.heading}>
                            <DynamicIcon micon={this.courseIcon} style={{margin: '0 15px 0 5px'}}/>
                            {data.name}
                        </div>
                        <div className={styles.description}>
                            {data.description}
                        </div>
                    </div>
                    <div className={styles.headerImage}>
                        {data.banner ?
                            <Avatar shape={"square"} size={120} src={data.banner.origin}/> :
                            <Avatar shape="square" size={120} icon={"file-image"}/>
                        }
                    </div>

                </div>
                <div className={"adminContent"} style={{paddingLeft: '10px'}}>
                    <Tabs defaultActiveKey="3" tabPosition={"left"}>
                        <TabPane
                            tab={<span>
                                <Icon type="home" theme={"twoTone"}
                                      style={{marginRight: '10px'}}/>Basic Information
                            </span>}
                            key="1">
                            <CourseSettings data={data} handleUpdateCourse={this.handleUpdateCourse}/>
                        </TabPane>

                        <TabPane
                            tab={<span>
                                <Icon type="database" theme={"twoTone"} style={{marginRight: '10px'}}/>Course Curriculum</span>}
                            key="3">

                            <Curriculum courseData={data}/>
                        </TabPane>

                        <TabPane
                            tab={<span>
                                <Icon type="picture" theme={"twoTone"} style={{marginRight: '10px'}}/>Course Banner Image</span>}
                            key="4">
                            <h4>Course banner image</h4>
                            {data.banner ?
                                (<img className={styles.imgBanner} alt="example" src={data.banner.origin}/>) :
                                (<Result status="404" title="404" subTitle="No banner found."/>)}

                            <Upload name="banner"
                                    onChange={info => {
                                        info.file.status = "done";
                                    }}
                                    customRequest={options => {
                                        this.handleUpdateBanner(options.file);
                                    }}>
                                <Button className={styles.uploadBtn}>
                                    <Icon type="upload"/> Click to update
                                </Button>
                            </Upload>
                        </TabPane>

                        <TabPane
                            tab={<span><Icon type="sound" theme={"twoTone"} style={{marginRight: '10px'}}/>
                            Promotional Video
                            </span>}
                            key="5">
                            <h4>Promotional video</h4>
                            {data.promoVideoUrl ?
                                (<Card size="small"
                                       actions={null}
                                       cover={<iframe title="promotional video" src={data.promoVideoUrl} width="560"
                                                      height="349"/>}/>
                                ) : (
                                    <Result status="404" title="404" subTitle="No promotional video found."/>
                                )}
                        </TabPane>

                    </Tabs>
                </div>
            </React.Fragment>
        );
    }
}
