import React from "react";
import {Route, Switch} from 'react-router-dom';
import AdminLayout from "./containers/admin";
import SecureRoute from "./routes/SecureRoute/";
import Auth from "./containers/Auth";
import TestOnly from "./containers/Test";
import Unauthorized from "./components/PageResult/Unauthorized";
import {RoleType} from "./constants/role_constant";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import NewQuestion from "./containers/QuestionsBank/NewQuestion/NewQuestion";
import EditBankQuestion from "./containers/QuestionsBank/EditQuestion/EditBankQuestion";

const QuestionsBank = React.lazy(() => import("./containers/QuestionsBank"));
const Courses = React.lazy(() => import("./containers/Courses/"));
const Dashboard = React.lazy(() => import("./containers/Dashboard"));
const NewCourse = React.lazy(() => import("./containers/NewCourse/NewCourse"));
const QuizEntrance = React.lazy(() => import("./components/Modules/Quiz/QuizEntrance"));
const Article = React.lazy(() => import("./components/Modules/Article/Article"));
const Survey = React.lazy(() => import("./components/Modules/Survey/SurveyQuestion"));
const Assignment = React.lazy(() => import("./components/Modules/Assignment/Assignment"));
const CourseDetail = React.lazy(() => import("./containers/CourseDetail/CourseDetail"));
const Video = React.lazy(() => import("./components/Modules/Video"));
const MyProfile = React.lazy(() => import("./containers/MyProfile/MyProfile"));
const AccountCenter = React.lazy(() => import('./containers/AccountCenter/AccountCenter'));
const Livestream = React.lazy(() => import("./components/Modules/Livestream/Livestream"));
const Forum = React.lazy(() => import("./components/Modules/Forum"));
const ForumTopic = React.lazy(() => import('./components/ForumTopic/ForumTopic'));
const Announcement = React.lazy(() => import('./components/Modules/Announcement/Announcement'));
const Resource = React.lazy(() => import('./components/Modules/Resource/Resource'));
const SemesterPage = React.lazy(() => import('./containers/Semester/SemesterPage'));
const DepartmentPage = React.lazy(() => import('./containers/Department/DepartmentPage'));

export default function (props) {
    return (
        <Switch>
            <Route path="/login" component={Auth}/>
            <Route path="/forgot-password" component={ForgotPassword}/>
            <Route path="/reset-password" component={ResetPassword}/>
            <Route path="/test" component={TestOnly}/>

            <AdminLayout>
                <Route path="/unauthorized" component={Unauthorized}/>

                <SecureRoute path="/new-course"
                             allowed={[RoleType.ADMIN]}
                             component={NewCourse}/>

                <SecureRoute path="/courses/:slug/quiz/:moduleId"
                             allowed={[RoleType.ADMIN, RoleType.INSTRUCTOR]}
                             component={QuizEntrance}/>

                <SecureRoute path="/courses/:slug/article/:moduleId"
                             allowed={[RoleType.ADMIN, RoleType.INSTRUCTOR]}
                             component={Article}/>

                <SecureRoute path="/courses/:slug/survey/:moduleId"
                             allowed={[RoleType.ADMIN, RoleType.INSTRUCTOR]}
                             component={Survey}/>

                <SecureRoute path="/courses/:slug/video/:moduleId"
                             allowed={[RoleType.ADMIN, RoleType.INSTRUCTOR]}
                             component={Video}/>

                <SecureRoute path="/courses/:slug/assignment/:moduleId"
                             allowed={[RoleType.ADMIN, RoleType.INSTRUCTOR]}
                             component={Assignment}/>

                <SecureRoute path="/courses/:slug/forum/:moduleId/post/:postId" exact
                             allowed={[RoleType.ADMIN, RoleType.INSTRUCTOR]}
                             component={ForumTopic}/>

                <SecureRoute path="/courses/:slug/forum/:moduleId" exact
                             allowed={[RoleType.ADMIN, RoleType.INSTRUCTOR]}
                             component={Forum}/>

                <SecureRoute
                    path="/courses/:slug/livestream/:moduleId"
                    allowed={[RoleType.ADMIN, RoleType.INSTRUCTOR]}
                    component={Livestream}/>

                <SecureRoute path="/courses/:slug/announcement/:moduleId"
                             allowed={[RoleType.ADMIN, RoleType.INSTRUCTOR]}
                             component={Announcement}/>

                <SecureRoute path="/courses/:slug/resource/:moduleId"
                             allowed={[RoleType.ADMIN, RoleType.INSTRUCTOR]}
                             component={Resource}/>

                <SecureRoute path="/courses/:slug"
                             allowed={[RoleType.ADMIN, RoleType.INSTRUCTOR]}
                             component={CourseDetail} exact/>

                <SecureRoute path="/courses"
                             allowed={[RoleType.ADMIN, RoleType.INSTRUCTOR]}
                             component={Courses} exact/>

                <SecureRoute path="/questions/:id"
                             allowed={[RoleType.ADMIN, RoleType.INSTRUCTOR]}
                             component={EditBankQuestion} exact/>

                <SecureRoute path="/questions"
                             allowed={[RoleType.ADMIN, RoleType.INSTRUCTOR]}
                             component={QuestionsBank} exact/>

                <SecureRoute path="/new-question"
                             allowed={[RoleType.ADMIN, RoleType.INSTRUCTOR]}
                             component={NewQuestion}/>

                <SecureRoute path="/profile"
                             allowed={[RoleType.ADMIN, RoleType.INSTRUCTOR]}
                             component={MyProfile} exact/>

                <SecureRoute path="/accounts"
                             allowed={[RoleType.ADMIN]}
                             component={AccountCenter} exact/>

                <SecureRoute path="/semesters"
                             allowed={[RoleType.ADMIN]}
                             component={SemesterPage} exact/>

                <SecureRoute path="/departments"
                             allowed={[RoleType.ADMIN]}
                             component={DepartmentPage}
                             exact/>

                <SecureRoute path="/"
                             allowed={[RoleType.ADMIN]}
                             component={Dashboard} exact/>

            </AdminLayout>

        </Switch>
    );
}
