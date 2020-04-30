import React, {Component} from "react";
import {Alert, Breadcrumb, Button, Checkbox, Form, Input, message, Spin} from "antd";
import styles from "./Announcement.module.css";
import {Link} from "react-router-dom";
import {Icon} from "react-icons-kit";
import ModulesConfig from "../../Curriculum/ModulesConfig";
import {ModuleType} from "../../../constants/module_constant";
import {getModule} from "../../../services/module_service";
import {httpErrorHandler} from "../../../utils/axios_util";
import {createPatch} from "../../../utils/patch_util";
import {updateArticle} from "../../../services/article_service";
import {createAnnouncement, sendNotification, updateAnnouncement} from "../../../services/announcement_service";


class Announcement extends Component {
    state = {
        loading: true,
        module: {}
    };

    async componentDidMount() {
        const {params} = this.props.match;
        try {
            const {data} = await getModule(params.moduleId);
            console.log(data);
            this.setState({module: data, loading: false});
        } catch (e) {
            httpErrorHandler(e, () => {
                switch (e.code) {
                    default:
                        message.error("Something went wrong");
                }
            });
        }
    }

    handleUpdate = (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            try {
                const {module} = this.state;
                let res;

                if (module.instanceData) {
                    const patch = [];
                    createPatch(patch, 'content', values.content);
                    const {data} = await updateAnnouncement(module.id, patch);
                    res = data;
                } else {
                    const {data} = await createAnnouncement(module.id, values.content);
                    res = data;
                }

                const updatedModule = {...module};
                updatedModule.instanceData = res;
                this.setState({module: updatedModule});
                message.success("Module has been updated !");

                if (values.email) {
                    await sendNotification(module.id);
                }
            } catch (e) {
                httpErrorHandler(e, () => {
                    switch (e.code) {
                        default:
                            message.error("Something went wrong");
                    }
                })
            }
        })
    };

    render() {
        const {module, loading} = this.state;
        if (loading) {
            return <Spin/>
        }
        const {match, location} = this.props;
        const {getFieldDecorator} = this.props.form;
        const query = new URLSearchParams(location.search);

        return (
            <>
                <div className={styles.header}>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to={"/courses"}>Courses</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to={"/courses/" + match.params.slug}>
                                {query.get('course')}
                            </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>{module.title}</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className={styles.heading}>
                        <Icon
                            icon={ModulesConfig[ModuleType.ANNOUNCEMENT].icon}
                            className={'circle-icon'}
                            style={{color: ModulesConfig[ModuleType.ANNOUNCEMENT].color, marginRight: "20px"}}
                        />
                        {module.title}
                    </div>
                </div>

                <div className="adminContent">
                    <div>
                        <Form type={"vertical"} onSubmit={this.handleUpdate}>
                            <Form.Item label={"Announcement"} className={'article'}>
                                {
                                    getFieldDecorator('content', {
                                        required: true,
                                        initialValue: module.instanceData ? module.instanceData.content : ""
                                    })(
                                        <Input.TextArea onChange={this.handleContentChange} rows={5}/>
                                    )
                                }
                            </Form.Item>

                            <Form.Item label={"Send email to students"}>
                                {
                                    getFieldDecorator('email', {
                                        valuePropName: 'checked',
                                        initialValue: true
                                    })(<Checkbox/>
                                    )
                                }
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Update
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>

            </>
        );
    }
}

const AnnouncementWrap = Form.create({name: 'announcement_form'})(Announcement);

export default AnnouncementWrap;
