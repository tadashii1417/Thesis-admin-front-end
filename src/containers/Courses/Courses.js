import React, {Component} from "react";
import CoursesTable from "../../components/CoursesTable/CoursesTable";
import Categories from "../../components/Categories/Categories";
import {Tabs} from 'antd';
import {checkIsAdmin} from "../../utils/permision_util";

const {TabPane} = Tabs;

class Courses extends Component {
    render() {
        const isAdmin = checkIsAdmin(this.props.user.roles);

        return (
            <div className="adminContent">
                <Tabs type={"card"}>
                    <TabPane tab="Courses" key="1">
                        <CoursesTable isAdmin={isAdmin}/>
                    </TabPane>

                    {isAdmin &&
                    <TabPane tab="Categories" key="2">
                        <Categories/>
                    </TabPane>
                    }
                </Tabs>
            </div>
        );
    }
}

export default Courses;
