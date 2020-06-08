import React, {Component} from "react";
import {Divider, message, Pagination, Spin} from "antd";
import {getCourseFeedback} from "../../services/course_service";
import Review from "../Review/Review";

class CourseFeedback extends Component {
    state = {
        feedback: [],
        pagination: {},
        loading: true
    }

    componentDidMount() {
        this.fetchFeedback({page: 1});
    }

    fetchFeedback = async (param = {}) => {
        try {
            const {data} = await getCourseFeedback(this.props.courseId, param.page);

            const pagination = {...this.state.pagination};
            pagination.total = data.totalPageCount * 10;
            this.setState({
                loading: false,
                feedback: data.items,
                pagination
            });
        } catch (e) {
            message.error("Fetch reviews failed");
        }
    }

    handlePageChange = (page) => {
        const pager = {...this.state.pagination};
        pager.current = page;
        this.setState({
            pagination: pager,
        });
        this.fetchFeedback({page: page})
    };

    render() {
        const {feedback, loading} = this.state;
        if (loading) return <Spin/>;

        return (
            <>
                <h4>Course Reviews</h4>
                <Divider/>

                {feedback.map(review => <Review key={review.id} {...review}/>)}

                <div style={{textAlign: 'right'}}>
                    <Pagination {...this.state.pagination} onChange={this.handlePageChange}/>
                </div>
            </>
        );
    }
}

export default CourseFeedback;
