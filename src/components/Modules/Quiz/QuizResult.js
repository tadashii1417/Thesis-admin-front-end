import React, {Component} from "react";
import {Table, Avatar, Spin, message, Button, Icon, Breadcrumb, Tag} from 'antd';
import {defaultAvatar} from "../../../constants/dev_constant";
import {httpErrorHandler} from "../../../utils/axios_util";
import styles from './Quiz.module.css';
import moment from "moment";
import config from "../../../config";
import {fetchQuizResult} from "../../../services/quiz_service";
import {Route, Switch, withRouter} from "react-router";
import StudentAttempts from "./StudentAttempts";
import {Link} from "react-router-dom";


class QuizResult extends Component {
    state = {
        loading: true,
        results: []
    };

    async componentDidMount() {
        const {moduleId} = this.props;
        try {
            const {data} = await fetchQuizResult(moduleId);
            this.setState({results: data, loading: false});
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
            title: 'Avatar',
            dataIndex: 'avatar',
            key: 'avatar',
            render: text => (text ? <Avatar src={text}/> : <Avatar src={defaultAvatar}/>),
            width: "10%",
            align: 'center'
        },
        {
            title: 'Name',
            key: 'name',
            render: (text, row) => (<span>{row.firstName} {row.lastName}</span>),
            width: "20%"
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: "25%"
        },
        {
            title: "Result",
            key: 'result',
            children: [
                {
                    title: "Final Score",
                    dataIndex: 'result.finalMark',
                    key: 'finalMark',
                    align: 'center',
                    render: score => <b>{score}</b>
                },
                {
                    title: "Passed",
                    dataIndex: 'result.passed',
                    key: 'passed',
                    align: 'center',
                    render: passed => passed ? <Tag color='green'>PASS</Tag> : <Tag color='magenta'>FAIL</Tag>
                },
                {
                    title: "Last attempt",
                    dataIndex: 'result.lastAttemptStartAt',
                    key: 'lastAttempt',
                    render: data => (data ?
                        moment(data, config.timeFormat).format('HH:mm:ss DD/MM/YYYY') :
                        null)
                }
            ]
        },
        {
            title: 'Action',
            key: 'view',
            align: 'center',
            render: (_, row) => {
                const {url} = this.props.match;
                return (
                    <Link to={url + '/attempts/' + row.id + window.location.search}>
                        <Button><Icon theme={"twoTone"} type={"eye"}/></Button>
                    </Link>
                );
            }
        }
    ];

    render() {
        const {loading, results} = this.state;
        const {moduleId, courseName} = this.props;
        const {url} = this.props.match;
        if (loading) return <Spin/>;

        return (
            <div className={styles.quizContainer}>
                <Breadcrumb className={styles.breadcrumb}>
                    <Breadcrumb.Item>
                        <Link to={url + window.location.search} style={{color: '#2e6da4'}}>
                            <Icon type={'user'}/>
                            <span>Result List</span>
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        Attempts
                    </Breadcrumb.Item>
                </Breadcrumb>

                <div style={{textAlign: 'right'}}>
                    <i>Total: {results.length} students.</i>
                </div>

                <Switch>
                    <Route path={url + '/attempts/:learnerId'}
                           render={() => <StudentAttempts moduleId={moduleId} courseName={courseName}/>}/>
                    <Route path={url}
                           render={() =>
                               <Table dataSource={results}
                                      columns={this.columns}
                                      size="middle"
                                      bordered
                                      rowKey={record => record.id}
                                      scroll={{x: 'calc(400px + 50%)'}}/>
                           }/>
                </Switch>
            </div>
        );
    }
}

export default withRouter(QuizResult);
