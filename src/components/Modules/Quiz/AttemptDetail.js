import React, {Component} from "react";
import {message, Spin} from "antd";
import {fetchSpecificQuizAttempt} from "../../../services/quiz_service";
import {httpErrorHandler} from "../../../utils/axios_util";
import {QuestionType} from "../../../constants/quiz_constant";
import MultipleChoiceQuestion from "../../QuestionType/MultipleChoiceQuestion";
import SingleChoiceQuestion from "../../QuestionType/SingleChoiceQuestion";
import InputQuestion from "../../QuestionType/InputQuestion";
import {withRouter} from "react-router";

class AttemptDetail extends Component {
    state = {
        data: {},
        loading: true
    };

    async componentDidMount() {
        const {attemptId} = this.props.match.params;
        try {
            const {data} = await fetchSpecificQuizAttempt(attemptId);
            this.setState({data: data, loading: false});
        } catch (e) {
            httpErrorHandler(e, () => {
                switch (e.code) {
                    default:
                        message.error("Something went wrong");
                }
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const newId = this.props.match.params.attemptId;
        const oldId = prevProps.match.params.attemptId;
        if (newId !== oldId) {
            this.updateAttemptDetail(newId);
        }
    }

    async updateAttemptDetail(id) {
        this.setState({loading: true});
        try {
            const {data} = await fetchSpecificQuizAttempt(id);
            this.setState({data: data, loading: false});
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
        const {data, loading} = this.state;
        const {questions} = data;
        console.log(data);
        if (loading) {
            return <Spin size={"large"} style={{marginLeft: '30%', width: '40%'}}/>
        }

        return (
            <div>
                {questions.map((question, index) => {
                    switch (question.type) {
                        case QuestionType.MULTIPLE_ANSWER:
                            return <MultipleChoiceQuestion key={question.id} data={question} index={index}/>;
                        case QuestionType.SINGLE_ANSWER:
                            return <SingleChoiceQuestion key={question.id} data={question} index={index}/>;
                        case QuestionType.INPUT:
                            return <InputQuestion key={question.id} data={question} index={index}/>;
                        default:
                            return "";
                    }
                })}
            </div>
        );
    }
}

export default withRouter(AttemptDetail);