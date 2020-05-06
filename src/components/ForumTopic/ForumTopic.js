import React, {Component} from "react";
import {Avatar, Breadcrumb, Icon as AIcon, message, Input, Button, Spin} from "antd";
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
        loading: true,
        answers: []
    };

    async componentDidMount() {
        try {
            const postId = this.props.match.params.postId;
            const {data} = await getPostComments(postId);
            this.setState({answers: data, loading: false});
        } catch (e) {
            message.info("Fetch answer fail !");
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
        const {loading, answers} = this.state;
        if (loading) {
            return <Spin/>
        }

        const {match: {params}, location} = this.props;
        const {state: {module, post, courseName}} = location;
        const {instanceData: {intro}} = module;

        let comments = "";

        if (answers.length) {
            comments = answers.map(res => (
                <div className={styles.commentContainer}>
                    <div className={styles.userInfo}>
                        <Avatar src={defaultAvatar} className={styles.avatar}/>
                        <div className={styles.authorName}>
                            {res.author.firstName + " " + res.author.lastName}
                        </div>
                    </div>
                    <div className={styles.userComment}>
                        <div className={styles.time}>
                            {moment(res.createdAt, config.timeFormat).format('HH:mm:ss DD/MM/YYYY')}
                        </div>
                        <div className={styles.comment}>
                            {res.content}
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
                            <Link to={`/courses/${params.slug}`}>
                                {courseName}
                            </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to={
                                {
                                    pathname: `/courses/${params.slug}/forum/${params.moduleId}`,
                                    state: {
                                        courseName: courseName
                                    }
                                }}>
                                {module.title}
                            </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>{post.title}</Breadcrumb.Item>
                    </Breadcrumb>

                    <div className={styles.heading}>
                        <Icon
                            icon={ModulesConfig[ModuleType.FORUM].icon}
                            className={'circle-icon'}
                            style={{color: ModulesConfig[ModuleType.FORUM].color, marginRight: "20px"}}
                        />
                        {post.title}
                    </div>
                    <div className={styles.description}>
                        {post.content}
                    </div>
                </div>

                <div className="adminContent">
                    <div className={styles.commentContainer}>
                        <div className={styles.userInfo}>
                            <Avatar src={defaultAvatar} className={styles.avatar}/>
                            <div className={styles.authorName}>
                                {post.author.firstName + " " + post.author.lastName}
                            </div>
                        </div>
                        <div className={styles.userComment}>
                            <div className={styles.time}>
                                {moment(post.createdAt, config.timeFormat).format('HH:mm:ss DD/MM/YYYY')}
                            </div>
                            <div className={styles.comment}>
                                {post.content}
                            </div>
                        </div>
                    </div>
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
