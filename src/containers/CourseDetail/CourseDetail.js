import React, {Component} from "react";
import {connect} from "react-redux";
import {Tabs, Icon, Breadcrumb, message, Avatar} from 'antd';
import styles from './CourseDetail.module.css';
import {Link} from "react-router-dom";
import {httpErrorHandler} from "../../utils/axios_util";
import axios from '../../config/axios-config';
import './CourseDetail.css';
import {updateCourse, updateCourseBanner} from "../../services/course_service";
import DynamicIcon from "../../components/DynamicIcon/DynamicIcon";
import courseIcon from "../../components/CourseIcon/CourseIcon";
import {checkIsAdmin} from "../../utils/permision_util";
import Loading from "../../components/Loading/Loading";

const PromotionalVideo = React.lazy(() => import("../../components/PromotionalVideo/PromotionalVideo"));
const UpdateBanner = React.lazy(() => import("../../components/UpdateBanner/UpdateBanner"));
const Curriculum = React.lazy(() => import("./Curriculum/Curriculum"));
const CourseFeedback = React.lazy(() => import("../../components/CourseFeedback/CourseFeedback"));
const CourseEnrollments = React.lazy(() => import("../../components/CourseEnrollments/CourseEnrollments"));
const CourseInstructors = React.lazy(() => import("../../components/CourseInstructors/CourseInstructors"));
const MyCalendar = React.lazy(() => import("../../components/Calendar/Calendar"));
const CourseSettings = React.lazy(() => import("../../components/CourseSettings/CourseSettings"));
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
            const {slug} = this.props.match.params;
            await updateCourseBanner(this.state.data.id, file);
            const {data} = await axios.get('/api/courses/' + slug);
            this.setState({data: data});
            message.success("Course banner has been updated");
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
                            tab={<span><Icon type="home" theme={"twoTone"} style={{marginRight: '10px'}}/>Basic Information</span>}
                            key="setting">
                            <React.Suspense fallback={"loading..."}>
                                <CourseSettings data={data} handleUpdateCourse={this.handleUpdateCourse}/>
                            </React.Suspense>
                        </TabPane>}

                        {isAdmin &&
                        <TabPane
                            tab={<span><Icon type="idcard" theme={"twoTone"} style={{marginRight: '10px'}}/>Manage Instructors</span>}
                            key="instructor">
                            <React.Suspense fallback={"loading ..."}>
                                <CourseInstructors courseId={data.id} instructors={data.instructors}/>
                            </React.Suspense>
                        </TabPane>}

                        <TabPane
                            tab={<span><Icon type="database" theme={"twoTone"} style={{marginRight: '10px'}}/>Course Curriculum</span>}
                            key="curriculum">
                            <React.Suspense fallback={"loading ..."}>
                                <Curriculum courseData={data}/>
                            </React.Suspense>
                        </TabPane>

                        <TabPane
                            tab={<span><Icon type="calendar" theme={"twoTone"} style={{marginRight: '10px'}}/>My Calendar</span>}
                            key="calendar">
                            <React.Suspense fallback={"loading ..."}>
                                <MyCalendar courseId={data.id}/>
                            </React.Suspense>
                        </TabPane>

                        <TabPane tab={<span><Icon type="snippets" theme={"twoTone"} style={{marginRight: '10px'}}/>Enrollments</span>}
                                 key="enrollments">
                            <React.Suspense fallback={"loading ..."}>
                                <CourseEnrollments courseId={data.id}/>
                            </React.Suspense>
                        </TabPane>

                        {isAdmin && <TabPane
                            tab={<span><Icon type="diff" theme={"twoTone"} style={{marginRight: '10px'}}/>Course Reviews</span>}
                            key="review">

                            <React.Suspense fallback={"loading ..."}>
                                <CourseFeedback courseId={data.id}/>
                            </React.Suspense>
                        </TabPane>}

                        {isAdmin && <TabPane
                            tab={<span><Icon type="picture" theme={"twoTone"} style={{marginRight: '10px'}}/>Course Banner Image</span>}
                            key="banner">
                            <React.Suspense fallback={"loading ..."}>
                                <UpdateBanner banner={data.banner} handleUpdateBanner={this.handleUpdateBanner}/>
                            </React.Suspense>
                        </TabPane>}

                        {isAdmin &&
                        <TabPane key="videoUrl"
                                 tab={<span><Icon type="sound" theme={"twoTone"} style={{marginRight: '10px'}}/>
                                 Promotional Video</span>}>
                            <React.Suspense fallback={"loading ..."}>
                                <PromotionalVideo promoVideoUrl={data.promoVideoUrl}/>
                            </React.Suspense>
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
