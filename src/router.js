import React from "react";
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import AdminLayout from "./containers/admin";
import NewCourse from "./containers/NewCourse/NewCourse";
import QuestionsBank from "./containers/QuestionsBank/QuestionsBank";
import NewQuestion from "./containers/NewQuestion/NewQuestion";

import Announcement from "./components/Modules/Announcement/Announcement";
import Article from "./components/Modules/Article/Article";
import Forum from "./components/Modules/Forum/Forum";
import AssignmentReport from "./components/Modules/Assignment/AssignmentReport";
import Assignment from "./components/Modules/Assignment/Assignment";
import Video from "./components/Modules/Video/Video";
import Resource from "./components/Modules/Resource/Resource";
import QuizSetting  from "./components/Modules/Quiz/QuizSetting";
import QuizEntrance from "./components/Modules/Quiz/QuizEntrance";
import QuizEdit from "./components/Modules/Quiz/QuizEdit";
import Courses from "./containers/Courses/Courses";

export default function (props) {
    return (
        <BrowserRouter>
            <AdminLayout>
                <Switch>
                    <Route path="/" component={Courses} exact/>
                    <Route path="/courses" component={Courses} exact/>
                    <Route path="/new-course" component={NewCourse} exact/>
                    <Route path="/course/edit/announcement" component={Announcement} exact/>
                    <Route path="/course/edit/video" component={Video} exact/>
                    <Route path="/course/edit/quiz" component={QuizSetting} exact/>
                    <Route path="/course/edit/resource" component={Resource} exact/>
                    <Route path="/course/edit/content" component={Article} exact/>
                    <Route path="/course/edit/forum" component={Forum} exact/>
                    <Route path="/course/edit/assignment" component={Assignment} exact/>
                    <Route path="/course/edit/announcement" component={Announcement} exact/>
                    <Route path="/course/quiz" component={QuizEntrance} exact/>
                    <Route path="/course/assignment" component={AssignmentReport}/>
                    <Route path="/course/edit-question" component={QuizEdit} exact/>
                    <Route path="/questions" component={QuestionsBank} exact/>
                    <Route path="/new-question" component={NewQuestion} exact/>
                </Switch>
            </AdminLayout>
        </BrowserRouter>
    );
}