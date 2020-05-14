import React from "react";
import ModuleHeader from "../ModuleHeader/ModuleHeader";
import {Alert} from "antd";

export default function ({children, module, slug, courseName, moduleType, moduleLink, moduleDescription, postTitle}) {
    return (
        <React.Fragment>
            <ModuleHeader moduleTitle={module.title}
                          courseSlug={slug}
                          courseName={courseName}
                          moduleDescription={moduleDescription}
                          moduleLink={moduleLink}
                          postTitle={postTitle}
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
        </React.Fragment>
    );
}