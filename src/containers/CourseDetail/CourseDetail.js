import React, {Component} from "react";
import {connect} from "react-redux";
import {Card, Upload, Button, Tabs, Icon, Breadcrumb, message, Result, Avatar} from 'antd';
import styles from './CourseDetail.module.css';
import Curriculum from "./Curriculum/Curriculum";
import {Link} from "react-router-dom";
import {httpErrorHandler} from "../../utils/axios_util";
import axios from '../../config/axios-config';
import CourseSettings from "../../components/CourseSettings/CourseSettings";
import './CourseDetail.css';
import {updateCourse, updateCourseBanner} from "../../services/course_service";
import DynamicIcon from "../../components/DynamicIcon/DynamicIcon";
import courseIcon from "../../components/CourseIcon/CourseIcon";
import CourseEnrollments from "../../components/CourseEnrollments/CourseEnrollments";
import MyCalendar from "../../components/Calendar/Calendar";
import {checkIsAdmin} from "../../utils/permision_util";
import CourseInstructors from "../../components/CourseInstructors/CourseInstructors";
import CourseFeedback from "../../components/CourseFeedback/CourseFeedback";
import Loading from "../../components/Loading/Loading";

// TODO: Create lazy loading for tab panel

const {TabPane} = Tabs;

class CourseDetail extends Component {
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
        if (patch.length === 0) return;

        try {
            const {data} = await updateCourse(this.state.data.id, patch);
            message.success("Course has been updated");
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


    render() {
        const {data, loading} = this.state;
        if (loading) return <Loading/>;
        const {user} = this.props;
        const isAdmin = checkIsAdmin(user.type);

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
                            <DynamicIcon icon={courseIcon()} style={{margin: '0 15px 0 5px'}}/>
                            {data.name}
                        </div>
                        <div className={styles.description}>
                            {data.description}
                        </div>
                    </div>
                    <div className={styles.headerImage}>
                        {data.banner ?
                            <Avatar shape={"square"} size={100} src={data.banner.origin}/> :
                            <Avatar shape="square" size={100} icon={"file-image"}/>
                        }
                    </div>

                </div>
                <div className={"adminContent"} style={{paddingLeft: '10px'}}>
                    <Tabs defaultActiveKey="curriculum" tabPosition={"left"}>
                        {isAdmin &&
                        <TabPane
                            tab={<span>
                                <Icon type="home" theme={"twoTone"}
                                      style={{marginRight: '10px'}}/>Basic Information
                            </span>}
                            key="setting">
                            <CourseSettings data={data} handleUpdateCourse={this.handleUpdateCourse}/>
                        </TabPane>}

                        {isAdmin &&
                        <TabPane
                            tab={<span>
                                <Icon type="idcard" theme={"twoTone"}
                                      style={{marginRight: '10px'}}/>Manage Instructors
                            </span>}
                            key="instructor">
                            <CourseInstructors courseId={data.id} instructors={data.instructors}/>
                        </TabPane>}

                        <TabPane
                            tab={<span><Icon type="database" theme={"twoTone"} style={{marginRight: '10px'}}/>Course Curriculum</span>}
                            key="curriculum">
                            <Curriculum courseData={data}/>
                        </TabPane>

                        <TabPane
                            tab={<span><Icon type="calendar" theme={"twoTone"}
                                             style={{marginRight: '10px'}}/>My Calendar</span>}
                            key="calendar">
                            <MyCalendar courseId={data.id}/>
                        </TabPane>

                        <TabPane
                            tab={<span><Icon type="snippets" theme={"twoTone"}
                                             style={{marginRight: '10px'}}/>Enrollments</span>}
                            key="enrollments">
                            <CourseEnrollments courseId={data.id}/>
                        </TabPane>

                        {isAdmin && <TabPane tab={<span><Icon type="diff" theme={"twoTone"}
                                                              style={{marginRight: '10px'}}/>Course Reviews</span>}
                                             key="review">
                            <CourseFeedback courseId={data.id}/>
                        </TabPane>}

                        {isAdmin && <TabPane
                            tab={<span>
                                <Icon type="picture" theme={"twoTone"} style={{marginRight: '10px'}}/>Course Banner Image</span>}
                            key="banner">
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
                        </TabPane>}

                        {isAdmin &&
                        <TabPane key="videoUrl"
                                 tab={<span><Icon type="sound" theme={"twoTone"}
                                                  style={{marginRight: '10px'}}/>Promotional Video</span>}>
                            <h4>Promotional video</h4>
                            {data.promoVideoUrl ?
                                (<Card size="small"
                                       actions={null}
                                       cover={<iframe title="promotional video" src={data.promoVideoUrl} width="560"
                                                      height="349"/>}/>
                                ) : (<Result status="404" title="404" subTitle="No promotional video found."/>)}
                        </TabPane>}

                    </Tabs>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    user: state.authReducer.user
})

export default connect(mapStateToProps)(CourseDetail);
