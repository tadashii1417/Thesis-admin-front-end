import React, {Component} from "react";
import {Breadcrumb, Upload, Icon as AntIcon, message, Spin, Divider, Button} from "antd";
import styles from "./Resource.module.css";
import {Link} from "react-router-dom";
import {Icon} from "react-icons-kit";
import ModulesConfig from "../../Curriculum/ModulesConfig";
import {ModuleType} from "../../../constants/module_constant";
import {getModule} from "../../../services/module_service";
import {httpErrorHandler} from "../../../utils/axios_util";
import {createResource} from "../../../services/resource_service";

const {Dragger} = Upload;

class Resource extends Component {
    state = {
        loading: true,
        module: {},
    };

    async componentDidMount() {
        await this.fetchModule();
    }

    fetchModule = async () => {
        const {params} = this.props.match;
        try {
            const {data} = await getModule(params.moduleId);
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

    createResource = async (file) => {
        try {
            await createResource(this.state.module.id, file);
            await this.fetchModule();
        } catch (e) {
            httpErrorHandler(e, () => {
                switch (e.code) {
                    default:
                        message.error("Something went wrong");
                }
            })
        }
    }

    render() {
        const {module, loading} = this.state;
        if (loading) {
            return <Spin/>
        }

        const {match, location: {state: {courseName}}} = this.props;

        return (
            <>
                <div className={styles.header}>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to={"/courses"}>Courses</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to={"/courses/" + match.params.slug}>
                                {courseName}
                            </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>{module.title}</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className={styles.heading}>
                        <Icon
                            icon={ModulesConfig[ModuleType.RESOURCE].icon}
                            className={'circle-icon'}
                            style={{color: ModulesConfig[ModuleType.RESOURCE].color, marginRight: "20px"}}
                        />
                        {module.title}
                    </div>
                </div>

                <div className="adminContent">
                    {
                        module.instanceData ?
                            <>
                                <h4>
                                    <AntIcon type="double-right" className={styles.icon}/>
                                    Your uploaded file
                                </h4>
                                <Divider/>
                                <div className={styles.files}>
                                    <Button onClick={() => window.open(module.instanceData.url, '_blank')} icon={"paper-clip"}>
                                        {module.instanceData.displayName}
                                    </Button>
                                </div>
                            </>
                            :
                            <>
                                <h4>
                                    <AntIcon type="double-right" className={styles.icon}/>
                                    Select file to upload
                                </h4>
                                <Divider/>
                                <div className={styles.dragger}>
                                    <Dragger
                                        customRequest={(req) => {
                                            this.createResource(req.file);
                                        }}>
                                        <p className="ant-upload-drag-icon">
                                            <AntIcon type="inbox"/>
                                        </p>
                                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                        <p className="ant-upload-hint">
                                            Support for a single upload only !
                                        </p>
                                    </Dragger>
                                </div>
                            </>
                    }
                </div>
            </>
        );
    }
}

export default Resource;
