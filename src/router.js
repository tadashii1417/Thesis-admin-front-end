import React from "react";
import {Route, Switch} from 'react-router-dom';
import AdminLayout from "./containers/admin";
import AdminRoute from "./routes/AdminRoute";
import PublicRoute from "./routes/PublicRoute";
import Auth from "./containers/Auth";
import Loading from "./components/Loading/Loading";
import TestOnly from "./containers/Test";

const QuestionsBank = React.lazy(() => import("./containers/QuestionsBank/index.js"), {fallback: ''});
const Courses = React.lazy(() => import("./containers/Courses/Courses"), {fallback: ''});
const Dashboard = React.lazy(() => import("./containers/Dashboard"), {fallback: ''});
const NewCourse = React.lazy(() => import("./containers/NewCourse/NewCourse"), {fallback: ''});
const QuizEntrance = React.lazy(() => import("./components/Modules/Quiz/QuizEntrance"), {fallback: ''});
const Article = React.lazy(() => import("./components/Modules/Article/Article"), {fallback: ''});
const Assignment = React.lazy(() => import("./components/Modules/Assignment/Assignment"), {fallback: ''});
const CourseDetail = React.lazy(() => import("./containers/CourseDetail/CourseDetail"), {fallback: ''});
const Video = React.lazy(() => import("./components/Modules/Video"), {fallback: ''});
const AccountCenters = React.lazy(() => import("./containers/Accounts/Accounts"));


export default function (props) {
    const {isAuthenticated} = props;
    return (
        <Switch>
            <PublicRoute isAuthenticated={isAuthenticated} path="/login" component={Auth}/>
            <Route path={"/test"} component={TestOnly}/>
            <AdminLayout>
                <React.Suspense fallback={Loading}>
                    <AdminRoute isAuthenticated={isAuthenticated}
                                path="/new-course"
                                component={NewCourse}/>
                </React.Suspense>

                <React.Suspense fallback={Loading}>
                    <AdminRoute isAuthenticated={isAuthenticated}
                                path="/courses/:slug/quiz/:moduleId"
                                component={QuizEntrance}/>
                </React.Suspense>

                <React.Suspense fallback={Loading}>
                    <AdminRoute isAuthenticated={isAuthenticated}
                                path="/courses/:slug/article/:moduleId"
                                component={Article}/>
                </React.Suspense>

                <React.Suspense fallback={Loading}>
                    <AdminRoute isAuthenticated={isAuthenticated}
                                path="/courses/:slug/video/:moduleId"
                                component={Video}/>
                </React.Suspense>

                <React.Suspense fallback={Loading}>
                    <AdminRoute isAuthenticated={isAuthenticated}
                                path="/courses/:slug/assignment/:moduleId"
                                component={Assignment}/>
                </React.Suspense>


                <React.Suspense fallback={Loading}>
                    <AdminRoute isAuthenticated={isAuthenticated}
                                path="/courses/:slug"
                                component={CourseDetail} exact/>
                </React.Suspense>

                <React.Suspense fallback={Loading}>
                    <AdminRoute isAuthenticated={isAuthenticated}
                                path="/courses"
                                component={Courses} exact/>
                </React.Suspense>

                <React.Suspense fallback={Loading}>
                    <AdminRoute isAuthenticated={isAuthenticated}
                                path="/questions"
                                component={QuestionsBank}/>
                </React.Suspense>

                <React.Suspense fallback={Loading}>
                    <AdminRoute isAuthenticated={isAuthenticated}
                                path="/accounts"
                                component={AccountCenters} exact/>
                </React.Suspense>

                <React.Suspense fallback={Loading}>
                    <AdminRoute isAuthenticated={isAuthenticated}
                                path="/"
                                component={Dashboard} exact/>
                </React.Suspense>

            </AdminLayout>
        </Switch>
    );
}