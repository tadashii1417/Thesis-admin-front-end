import React, {Component} from "react";
import Route from './router';
import {finishLoadingApp, getMe, startLoadingApp} from "./store/actions";
import {connect} from "react-redux";
import "./App.css";
import {Spin} from "antd";

class App extends Component {
    async componentDidMount() {
        const {getMe, startLoadingApp, finishLoadingApp} = this.props;
        startLoadingApp();
        await getMe();
        finishLoadingApp();
    }

    render() {
        const {isAuthenticated, isAppLoading} = this.props;

        if (isAppLoading) {
            return <Spin size={'large'}/>;
        }

        return <Route isAuthenticated={isAuthenticated}/>;
    }
}

const mapStateToProps = (state) => ({
    isAppLoading: state.uiReducer.isAppLoading,
    isAuthenticated: state.authReducer.isAuthenticated,
    user: state.authReducer.user
});

const mapDispatchToProps = (dispatch) => ({
    getMe: () => dispatch(getMe()),
    startLoadingApp: () => dispatch(startLoadingApp()),
    finishLoadingApp: () => dispatch(finishLoadingApp())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
