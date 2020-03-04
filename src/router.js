import React from "react";
import {Route, Switch} from 'react-router-dom';
import AdminLayout from "./containers/admin";
import AdminRoute from "./routes/AdminRoute";
import PublicRoute from "./routes/PublicRoute";
import CourseDetail from "./containers/CourseDetail/CourseDetail";
import QuestionsBank from "./containers/QuestionsBank/index.js";
import Announcement from "./components/Modules/Announcement/Announcement";
import Article from "./components/Modules/Article/Article";
import Assignment from "./components/Modules/Assignment/Assignment";
// import Forum from "./components/Modules/Forum/Forum";
// import Video from "./components/Modules/Video/Video";
// import Resource from "./components/Modules/Resource/Resource";
import QuizEntrance from "./components/Modules/Quiz/QuizEntrance";
import QuizEdit from "./components/Modules/Quiz/QuizQuestions";
import Courses from "./containers/Courses/Courses";
import Auth from "./containers/Auth";
import Dashboard from "./containers/Dashboard";
import NewCourse from "./containers/NewCourse/NewCourse";

export default function (props) {
    const {isAuthenticated} = props;

    return (
        <Switch>
            <PublicRoute isAuthenticated={isAuthenticated} path="/login" component={Auth} exact/>
            <AdminLayout>
                <Route path={"/test"} component={Assignment}/>
                <AdminRoute isAuthenticated={isAuthenticated} path="/" component={Dashboard} exact/>
                <AdminRoute isAuthenticated={isAuthenticated} path="/courses" component={Courses} exact/>
                <AdminRoute isAuthenticated={isAuthenticated} path="/courses/:slug" component={CourseDetail} exact/>
                <AdminRoute isAuthenticated={isAuthenticated} path="/new-course" component={NewCourse} exact/>
                <AdminRoute isAuthenticated={isAuthenticated} path="/course/edit/announcement" component={Announcement}
                            exact/>
                <AdminRoute isAuthenticated={isAuthenticated} path="/course/edit/announcement" component={Announcement}
                            exact/>
                <AdminRoute isAuthenticated={isAuthenticated} path="/courses/:slug/quiz/:moduleId" component={QuizEntrance} exact/>
                <AdminRoute isAuthenticated={isAuthenticated} path="/courses/:slug/article/:moduleId" component={Article} exact/>
                <AdminRoute isAuthenticated={isAuthenticated} path="/courses/:slug/assignment/:moduleId" component={Assignment} exact/>

                <AdminRoute isAuthenticated={isAuthenticated} path="/course/edit-question" component={QuizEdit} exact/>
                <AdminRoute isAuthenticated={isAuthenticated} path="/questions" component={QuestionsBank} exact/>
            </AdminLayout>
        </Switch>
    );
}