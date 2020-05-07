import React from "react";
import ModuleHeader from "../ModuleHeader/ModuleHeader";
import {Alert} from "antd";

export default function ({children, module, slug, courseName, moduleType}) {
    return (
        <React.Fragment>
            <ModuleHeader moduleTitle={module.title}
                          courseSlug={slug}
                          courseName={courseName}
                          moduleType={moduleType}/>

            <div className="adminContent">
                {module.visibility === "private" &&
                <Alert
                    message={"This module is unpublished"}
                    type="info"
                    style={{margin: '10px 0 20px 0'}}
                    showIcon
                    closable
                />}
                {children}
            </div>
        </React.Fragment>
    );
}