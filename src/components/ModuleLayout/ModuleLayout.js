import React from "react";
import ModuleHeader from "../ModuleHeader/ModuleHeader";

export default function ({children, module, slug, courseName, moduleType}) {
    return (
        <React.Fragment>
            <ModuleHeader moduleTitle={module.title}
                          courseSlug={slug}
                          courseName={courseName}
                          moduleType={moduleType}/>

            <div className="adminContent">
                {children}
            </div>
        </React.Fragment>
    );
}