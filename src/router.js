import React from "react";
import {Switch} from 'react-router-dom';
import AdminLayout from "./containers/admin";
import AdminRoute from "./routes/AdminRoute";
import PublicRoute from "./routes/PublicRoute";
// import NewCourse from "./containers/NewCourse/NewCourse";
import NewCourseTrial from "./containers/NewCourse/NewCourseTrial";
import QuestionsBank from "./containers/QuestionsBank/index.js";
import NewQuestion from "./containers/NewQuestion/NewQuestion";
import Announcement from "./components/Modules/Announcement/Announcement";
import Article from "./components/Modules/Article/Article";
import Forum from "./components/Modules/Forum/Forum";
import AssignmentReport from "./components/Modules/Assignment/AssignmentReport";
import Assignment from "./components/Modules/Assignment/Assignment";
import Video from "./components/Modules/Video/Video";
import Resource from "./components/Modules/Resource/Resource";
import QuizSetting from "./components/Modules/Quiz/QuizSetting";
import QuizEntrance from "./components/Modules/Quiz/QuizEntrance";
import QuizEdit from "./components/Modules/Quiz/QuizEdit";
import Courses from "./containers/Courses/Courses";
import Auth from "./containers/Auth";
import Dashboard from "./containers/Dashboard";

export default function (props) {
    const {isAuthenticated} = props;

    return (
        <Switch>
            <PublicRoute isAuthenticated={isAuthenticated} path="/login" component={Auth} exact/>
            <AdminLayout>
                <AdminRoute isAuthenticated={isAuthenticated} path="/" component={Dashboard} exact/>
                <AdminRoute isAuthenticated={isAuthenticated} path="/courses" component={Courses} exact/>
                <AdminRoute isAuthenticated={isAuthenticated} path="/new-course" component={NewCourseTrial} exact/>
                <AdminRoute isAuthenticated={isAuthenticated} path="/course/edit/announcement" component={Announcement}
                            exact/>
                <AdminRoute isAuthenticated={isAuthenticated} path="/course/edit/video" component={Video} exact/>
                <AdminRoute isAuthenticated={isAuthenticated} path="/course/edit/quiz" component={QuizSetting} exact/>
                <AdminRoute isAuthenticated={isAuthenticated} path="/course/edit/resource" component={Resource} exact/>
                <AdminRoute isAuthenticated={isAuthenticated} path="/course/edit/content" component={Article} exact/>
                <AdminRoute isAuthenticated={isAuthenticated} path="/course/edit/forum" component={Forum} exact/>
                <AdminRoute isAuthenticated={isAuthenticated} path="/course/edit/assignment" component={Assignment}
                            exact/>
                <AdminRoute isAuthenticated={isAuthenticated} path="/course/edit/announcement" component={Announcement}
                            exact/>
                <AdminRoute isAuthenticated={isAuthenticated} path="/course/quiz" component={QuizEntrance} exact/>
                <AdminRoute isAuthenticated={isAuthenticated} path="/course/assignment" component={AssignmentReport}/>
                <AdminRoute isAuthenticated={isAuthenticated} path="/course/edit-question" component={QuizEdit} exact/>
                <AdminRoute isAuthenticated={isAuthenticated} path="/questions" component={QuestionsBank} exact/>
                <AdminRoute isAuthenticated={isAuthenticated} path="/new-question" component={NewQuestion} exact/>
            </AdminLayout>
        </Switch>
    );
}