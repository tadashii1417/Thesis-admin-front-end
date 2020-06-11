import React, {Component} from "react";
import {message, Button} from "antd";

import styles from './ForumTopic.module.css';
import {ModuleType} from "../../constants/module_constant";
import {addComment, getPostComments} from "../../services/forum_service";
import {httpErrorHandler} from "../../utils/axios_util";
import ModuleLayout from "../ModuleLayout/ModuleLayout";
import ForumComment from "../ForumComment/ForumComment";
import {Editor} from "doodle-editor";
import Loading from "../Loading/Loading";

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

    setComment = (value) => {
        this.setState({comment: value});
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
        if (loading) return <Loading/>;

        const {match: {params: {slug, moduleId}}, location} = this.props;
        const {state: {module, post, courseName}} = location;

        return (
            <ModuleLayout slug={slug}
                          moduleType={ModuleType.FORUM}
                          module={module} courseName={courseName}
                          postTitle={post.title}
                          showEdit={true}
                          moduleLink={{
                              pathname: `/courses/${slug}/forum/${moduleId}`,
                              state: {courseName: courseName}
                          }}>

                <ForumComment response={post}/>
                {answers.length ? answers.map(res => (
                    <ForumComment response={res}/>
                )) : ""}

                <div className={styles.commentArea}>
                    <Editor value={this.state.comment} onChange={this.setComment}/>
                    <Button type={"primary"} onClick={this.handleComment}>Add Comment</Button>
                </div>

            </ModuleLayout>
        );
    }
}

export default ForumTopic;
