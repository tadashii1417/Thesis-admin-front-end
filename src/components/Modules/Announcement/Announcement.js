import React, {Component} from "react";
import {Form, message, Spin} from "antd";
import {ModuleType} from "../../../constants/module_constant";
import {getModule, updateModule} from "../../../services/module_service";
import {httpErrorHandler} from "../../../utils/axios_util";
import {createPatch} from "../../../utils/patch_util";
import {createAnnouncement, sendNotification, updateAnnouncement} from "../../../services/announcement_service";
import AnnouncementForm from "../../Forms/AnnouncementForm/AnnouncementForm";
import ModuleLayout from "../../ModuleLayout/ModuleLayout";

class AnnouncementBasic extends Component {
    state = {
        loading: true,
        module: {}
    };

    async componentDidMount() {
        const {params} = this.props.match;
        try {
            const {data} = await getModule(params.moduleId);
            this.setState({module: data, loading: false});
        } catch (e) {
            httpErrorHandler(e, () => {
                message.error("Something went wrong");
            });
        }
    }

    handleEditModule = async (patch) => {
        const {module} = this.state;
        let key = "update-module";
        try {
            message.loading({content: "Loading", key});
            const {data} = await updateModule(module.id, patch);
            data.instanceData = module.instanceData;
            this.setState({module: data});
            message.success({content: "Module has been updated", key});
        } catch (e) {
            httpErrorHandler(e, () => {
                message.error({content: "Something went wrong", key});
            })
        }
    };

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
                    message.error("Something went wrong");
                })
            }
        })
    };

    render() {
        const {module, loading} = this.state;
        if (loading) return <Spin/>;

        const {getFieldDecorator} = this.props.form;
        const {match: {params: {slug}}, location: {state: {courseName}}} = this.props;

        return (
            <ModuleLayout
                module={module}
                moduleType={ModuleType.ANNOUNCEMENT}
                courseName={courseName}
                handleEditModule={this.handleEditModule}
                slug={slug}>

                <AnnouncementForm getFieldDecorator={getFieldDecorator}
                                  handleUpdate={this.handleUpdate}
                                  module={module}/>
            </ModuleLayout>
        );
    }
}

const Announcement = Form.create({name: 'announcement_form'})(AnnouncementBasic);

export default Announcement;
