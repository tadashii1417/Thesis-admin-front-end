import React, {Component} from "react";
import {Layout} from "antd";
import './admin.css';
import AdminSider from "../../components/AdminSider/AdminSider";
import AdminHeader from "../../components/AdminHeader/AdminHeader";
import Courses from "./Courses/Courses";
import NewCourse from './NewCourse/NewCourse';
import QuestionsBank from "./QuestionsBank/QuestionsBank";
import NewQuestion from "./NewQuestion/NewQuestion";
import Announcement from "../../components/Modules/Announcement/Announcement";
import Article from "../../components/Modules/Article/Article";
import AssignmentReport from "../../components/Modules/Assignment/AssignmentReport";
import Forum from "../../components/Modules/Forum/Forum";
import Assignment from "../../components/Modules/Assignment/Assignment";
import Video from "../../components/Modules/Video/Video";
import Resource from "../../components/Modules/Resource/Resource";
import QuizSetting  from "../../components/Modules/Quiz/QuizSetting";
import QuizEntrance from "../../components/Modules/Quiz/QuizEntrance";

class Admin extends Component {
    state = {
        collapsed: false
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed
        });
    };

    render() {
        return (
            <Layout style={{height: "100vh"}}>
                <AdminSider collapsed={this.state.collapsed}/>
                <Layout style={{minHeight: "100vh"}}>
                    <AdminHeader toggle={this.toggle} collapsed={this.state.collapsed}/>
                    {/*<Courses/>*/}
                    {/*<NewCourse/>*/}
                    {/*<QuestionsBank/>*/}
                    <NewQuestion />
                    {/*<Announcement/>*/}
                    {/*<Article/>*/}
                    {/*<Assignment/>*/}
                    {/*<Forum/>*/}
                    {/*<AssignmentReport/>*/}
                    {/*<Video/>*/}
                    {/*<Resource/>*/}
                    {/*<QuizEntrance/>*/}
                    {/*<QuizSetting/>*/}
                </Layout>
            </Layout>
        );
    }
}

export default Admin;
