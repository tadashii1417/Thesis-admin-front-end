import React, {Component} from "react";
import {message, Button, Modal} from "antd";

import {ModuleType} from "../../constants/module_constant";
import {addComment, getPostComments} from "../../services/forum_service";
import {httpErrorHandler} from "../../utils/axios_util";
import ModuleLayout from "../ModuleLayout/ModuleLayout";
import ForumComment from "../ForumComment/ForumComment";
import {Editor} from "lerna-rte";
import Loading from "../Loading/Loading";
import ForumQuestion from "../ForumQuestion/ForumQuestion";

class ForumTopic extends Component {
    state = {
        comment: false,
        commentText: "",
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

    setCommentText = (value) => {
        this.setState({commentText: value});
    }

    handleComment = async () => {
        try {
            const {match: {params: {postId}}} = this.props;
            const {commentText} = this.state;
            const {data} = await addComment(postId, commentText);
            const oldAnswers = [...this.state.answers];
            oldAnswers.push(data);
            this.setState({comment: false, commentText: "", answers: oldAnswers});
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

                <ForumQuestion response={post} answerCount={answers.length}/>

                {answers.length && answers.map((res, index) => (
                    <ForumComment response={res} key={index}/>
                ))}

                <div style={{textAlign: 'right', margin: '20px'}}>
                    <Button type={"primary"} onClick={() => {
                        this.setState({comment: true})
                    }}>Add Comment</Button>
                </div>

                <Modal visible={this.state.comment}
                       footer={null}
                       onCancel={() => this.setState({comment: false})}>
                    <div>
                        <Editor value={this.state.commentText} onChange={this.setCommentText}/>
                        <Button type={"primary"}
                                style={{margin: '15px 0'}}
                                onClick={this.handleComment}>Add Comment</Button>
                    </div>
                </Modal>


            </ModuleLayout>
        );
    }
}

export default ForumTopic;
