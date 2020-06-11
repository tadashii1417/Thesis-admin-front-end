import React, {Component} from "react";
import {Route, withRouter} from "react-router";
import {message, Table} from "antd";
import moment from "moment";
import config from "../../../config";
import {Link} from "react-router-dom";
import {fetchStudentAttempts} from "../../../services/quiz_service";
import {httpErrorHandler} from "../../../utils/axios_util";
import AttemptDetail from "./AttemptDetail";
import Loading from "../../Loading/Loading";


class StudentAttempts extends Component {
    state = {
        loading: true,
        attempts: []
    };

    async componentDidMount() {
        const {moduleId, match} = this.props;
        const {learnerId} = match.params;

        try {
            const {data} = await fetchStudentAttempts(learnerId, moduleId);
            const {attempts} = data;
            this.setState({attempts: attempts, loading: false});
        } catch (e) {
            httpErrorHandler(e, () => {
                switch (e.code) {
                    default:
                        message.error("Something went wrong");
                }
            })
        }
    }


    columns = [
        {
            title: "Attempt",
            key: 'index',
            align: 'center',
            render: (text, record, index) => index + 1,
            width: '10%'
        },
        {
            title: "Start time",
            dataIndex: 'startAt',
            key: 'startAt',
            align: 'center',
            render: data => (data ?
                moment(data, config.timeFormat).format('HH:mm:ss DD/MM/YYYY') :
                null)
        },
        {
            title: "Complete time",
            dataIndex: 'completeAt',
            key: 'lastAttempt',
            align: 'center',
            render: data => (data ?
                moment(data, config.timeFormat).format('HH:mm:ss DD/MM/YYYY') :
                null)
        },
        {
            title: "Score",
            dataIndex: 'mark',
            key: 'mark',
            align: 'center',
            render: score => <b>{score}</b>
        },
        {
            title: 'Action',
            key: 'view',
            align: 'center',
            render: (_, row) => {
                const {url} = this.props.match;
                return (
                    <Link to={{
                        pathname: url + '/detail/' + row.id, state: {
                            courseName: this.props.courseName
                        }
                    }}>
                        View detail
                    </Link>
                );
            }
        }
    ];

    render() {
        const {attempts, loading} = this.state;
        const {url} = this.props.match;
        if (loading) return <Loading/>;

        return (
            <>
                <Table dataSource={attempts}
                       columns={this.columns}
                       size="middle"
                       bordered
                       rowKey={record => record.id}
                       scroll={{x: 'calc(400px + 50%)'}}/>

                <Route exact path={url + '/detail/:attemptId'} render={() => <AttemptDetail/>}/>
            </>
        );
    }
}

export default withRouter(StudentAttempts);
