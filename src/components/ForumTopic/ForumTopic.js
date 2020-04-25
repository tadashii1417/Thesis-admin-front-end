import React, {Component} from "react";
import {Avatar, Breadcrumb, Divider, Icon as AIcon, message, Input, Button, Result} from "antd";
import {Link} from "react-router-dom";
import {Icon} from "react-icons-kit";

import styles from './ForumTopic.module.css';
import ModulesConfig from "../Curriculum/ModulesConfig";
import {ModuleType} from "../../constants/module_constant";
import {defaultAvatar} from "../../constants/dev_constant";
import moment from "moment";
import config from "../../config";
import {addComment, getPostComments} from "../../services/forum_service";
import {httpErrorHandler} from "../../utils/axios_util";

const {TextArea} = Input;

class ForumTopic extends Component {
    state = {
        comment: "",
        loading: false,
        module: {
            title: "This is a sample forum",
            instanceData: {
                intro: "This is a sample introduction"
            }
        },
        answers: []
    };

    async componentDidMount() {
        try {
            const postId = this.props.match.params.postId;
            const {data} = await getPostComments(postId);
            this.setState({answers: data});
        } catch (e) {
            message.info("No answer found !");
        }
    }

    setComment = (e) => {
        this.setState({comment: e.target.value});
    }

    handleComment = async () => {
        try {
            const {match: {params: {postId}}} = this.props;
            const {comment} = this.state;
            const {data} = await addComment(postId, comment);
            const oldAnswers = [...this.state.answers];
            oldAnswers.push(data);
            this.setState({comment: "", answers: oldAnswers});
        } catch (e) {
            httpErrorHandler(e, () => {
                switch (e.code) {
                    default:
                        message.error("Something went wrong");
                }
            })
        }
    }

    render() {
        const {module, loading, answers} = this.state;
        const {instanceData: {intro}} = module;
        // if (loading) {
        //     return <Spin/>
        // }
        const {match, location} = this.props;
        const query = new URLSearchParams(location.search);

        let comments = <Result
            status="404"
            title="No comment"
        />;
        if (answers.length) {
            comments = answers.map(answer => (
                <div className={styles.commentContainer}>
                    <div className={styles.userInfo}>
                        <Avatar src={defaultAvatar} className={styles.avatar}/>
                        <div className={styles.authorName}>
                            {answer.author.firstName + " " + answer.author.lastName}
                        </div>
                    </div>
                    <div className={styles.userComment}>
                        <div className={styles.time}>
                            {moment(answer.createdAt, config.timeFormat).format('HH:mm:ss DD/MM/YYYY')}
                        </div>
                        <div className={styles.comment}>
                            {answer.content}
                        </div>
                    </div>
                </div>
            ))
        }

        return (
            <>
                <div className={styles.header}>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to={"/courses"}>Courses</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to={"/courses/" + match.params.slug}>
                                {query.get('course')}
                            </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>{module.title}</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className={styles.heading}>
                        <Icon
                            icon={ModulesConfig[ModuleType.FORUM].icon}
                            className={'circle-icon'}
                            style={{color: ModulesConfig[ModuleType.FORUM].color, marginRight: "20px"}}
                        />
                        {module.title}
                    </div>
                    <div className={styles.description}>
                        {intro}
                    </div>
                </div>

                <div className="adminContent">
                    {comments}

                    <div className={styles.commentArea}>
                        <TextArea rows={3}
                                  placeholder={"Add comment here !"}
                                  style={{backgroundColor: '#fafafa'}}
                                  value={this.state.comment}
                                  onChange={this.setComment}/>
                        <Button type={"primary"} onClick={this.handleComment}>Add Comment</Button>
                    </div>

                </div>
            </>
        );
    }
}

export default ForumTopic;
