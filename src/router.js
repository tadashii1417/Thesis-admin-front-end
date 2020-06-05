import React from "react";
import {Route, Switch} from 'react-router-dom';
import AdminLayout from "./containers/admin";
import SecureRoute from "./routes/SecureRoute/";
import Auth from "./containers/Auth";
import Loading from "./components/Loading/Loading";
import TestOnly from "./containers/Test";
import Unauthorized from "./components/PageResult/Unauthorized";
import {RoleType} from "./constants/role_constant";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/ResetPassword/ResetPassword";

const QuestionsBank = React.lazy(() => import("./containers/QuestionsBank"));
const Courses = React.lazy(() => import("./containers/Courses/"));
const Dashboard = React.lazy(() => import("./containers/Dashboard"));
const NewCourse = React.lazy(() => import("./containers/NewCourse/NewCourse"));
const QuizEntrance = React.lazy(() => import("./components/Modules/Quiz/QuizEntrance"));
const Article = React.lazy(() => import("./components/Modules/Article/Article"));
const Survey = React.lazy(() => import("./components/Modules/Survey/Survey"));
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

export default function (props) {
    return (
        <Switch>
            <Route path="/login" component={Auth}/>
            <Route path="/forgot-password" component={ForgotPassword}/>
            <Route path="/reset-password" component={ResetPassword}/>
            <Route path="/test" component={TestOnly}/>

            <AdminLayout>
                <Route path="/unauthorized" component={Unauthorized}/>

                <React.Suspense fallback={Loading}>
                    <SecureRoute path="/new-course"
                                 allowed={[RoleType.ADMIN]}
                                 component={NewCourse}/>
                </React.Suspense>

                <React.Suspense fallback={Loading}>
                    <SecureRoute path="/courses/:slug/quiz/:moduleId"
                                 allowed={[RoleType.ADMIN, RoleType.INSTRUCTOR]}
                                 component={QuizEntrance}/>
                </React.Suspense>

                <React.Suspense fallback={Loading}>
                    <SecureRoute path="/courses/:slug/article/:moduleId"
                                 allowed={[RoleType.ADMIN, RoleType.INSTRUCTOR]}
                                 component={Article}/>
                </React.Suspense>

                <React.Suspense fallback={Loading}>
                    <SecureRoute path="/courses/:slug/survey/:moduleId"
                                 allowed={[RoleType.ADMIN, RoleType.INSTRUCTOR]}
                                 component={Survey}/>
                </React.Suspense>

                <React.Suspense fallback={Loading}>
                    <SecureRoute path="/courses/:slug/video/:moduleId"
                                 allowed={[RoleType.ADMIN, RoleType.INSTRUCTOR]}
                                 component={Video}/>
                </React.Suspense>

                <React.Suspense fallback={Loading}>
                    <SecureRoute path="/courses/:slug/assignment/:moduleId"
                                 allowed={[RoleType.ADMIN, RoleType.INSTRUCTOR]}
                                 component={Assignment}/>
                </React.Suspense>

                <React.Suspense fallback={Loading}>
                    <SecureRoute path="/courses/:slug/forum/:moduleId/post/:postId" exact
                                 allowed={[RoleType.ADMIN, RoleType.INSTRUCTOR]}
                                 component={ForumTopic}/>
                </React.Suspense>

                <React.Suspense fallback={Loading}>
                    <SecureRoute path="/courses/:slug/forum/:moduleId" exact
                                 allowed={[RoleType.ADMIN, RoleType.INSTRUCTOR]}
                                 component={Forum}/>
                </React.Suspense>

                <React.Suspense fallback={Loading}>
                    <SecureRoute
                        path="/courses/:slug/livestream/:moduleId"
                        allowed={[RoleType.ADMIN, RoleType.INSTRUCTOR]}
                        component={Livestream}/>
                </React.Suspense>

                <React.Suspense fallback={Loading}>
                    <SecureRoute path="/courses/:slug/announcement/:moduleId"
                                 allowed={[RoleType.ADMIN, RoleType.INSTRUCTOR]}
                                 component={Announcement}/>
                </React.Suspense>

                <React.Suspense fallback={Loading}>
                    <SecureRoute path="/courses/:slug/resource/:moduleId"
                                 allowed={[RoleType.ADMIN, RoleType.INSTRUCTOR]}
                                 component={Resource}/>
                </React.Suspense>

                <React.Suspense fallback={Loading}>
                    <SecureRoute path="/courses/:slug"
                                 allowed={[RoleType.ADMIN, RoleType.INSTRUCTOR]}
                                 component={CourseDetail} exact/>
                </React.Suspense>

                <React.Suspense fallback={Loading}>
                    <SecureRoute path="/courses"
                                 allowed={[RoleType.ADMIN, RoleType.INSTRUCTOR]}
                                 component={Courses} exact/>
                </React.Suspense>

                <React.Suspense fallback={Loading}>
                    <SecureRoute path="/questions"
                                 allowed={[RoleType.ADMIN, RoleType.INSTRUCTOR]}
                                 component={QuestionsBank}/>
                </React.Suspense>

                <React.Suspense fallback={Loading}>
                    <SecureRoute path="/profile"
                                 allowed={[RoleType.ADMIN, RoleType.INSTRUCTOR]}
                                 component={MyProfile} exact/>
                </React.Suspense>

                <React.Suspense fallback={Loading}>
                    <SecureRoute path="/accounts"
                                 allowed={[RoleType.ADMIN]}
                                 component={AccountCenter} exact/>
                </React.Suspense>

                <React.Suspense fallback={Loading}>
                    <SecureRoute path="/semesters"
                                 allowed={[RoleType.ADMIN]}
                                 component={SemesterPage} exact/>
                </React.Suspense>

                <React.Suspense fallback={Loading}>
                    <SecureRoute path="/"
                                 allowed={[RoleType.ADMIN]}
                                 component={Dashboard} exact/>
                </React.Suspense>

            </AdminLayout>

        </Switch>
    );
}