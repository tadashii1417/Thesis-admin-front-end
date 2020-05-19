import React, {Component, Suspense} from "react";
import ModuleHeader from "../ModuleHeader/ModuleHeader";
import {Alert, Modal} from "antd";

const EditModule = React.lazy(() => import('../Curriculum/EditModule/EditModule'));

export default class ModuleLayout extends Component {
    state = {
        editModule: false
    }

    closeEditModule = () => {
        this.setState({editModal: false});
    };

    openEditModule = () => {
        this.setState({editModal: true});
    };

    render() {
        const {
            children, showEdit,
            module, slug, courseName, moduleType, moduleLink,
            moduleDescription, postTitle, handleEditModule
        } = this.props;

        return (
            <React.Fragment>
                <ModuleHeader moduleTitle={module.title}
                              courseSlug={slug}
                              courseName={courseName}
                              moduleDescription={moduleDescription}
                              moduleLink={moduleLink}
                              postTitle={postTitle}
                              openEditModule={this.openEditModule}
                              closeEditModule={this.closeEditModule}
                              showEdit={showEdit}
                              moduleType={moduleType}/>


                <div className="adminContent">

                    {module.visibility === "private" && <Alert
                        message={"This module is unpublished"}
                        type="info"
                        style={{margin: '10px 0 20px 0'}}
                        showIcon
                        closable/>}

                    {children}
                </div>

                <Modal title={"Edit module"}
                       visible={this.state.editModal}
                       onCancel={this.closeEditModule}
                       footer={null}>
                    <Suspense fallback={null}>
                        <EditModule data={module} handleEditModule={handleEditModule}
                                    closeEditModule={this.closeEditModule}/>
                    </Suspense>
                </Modal>
            </React.Fragment>
        );
    }
}
