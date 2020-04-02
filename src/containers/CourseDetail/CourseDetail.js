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
import ServerErrors from "../../constants/server_error_constant";

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
                                <Link to={"/courses"}>Courses</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>{data.name}</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className={styles.heading}>
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
