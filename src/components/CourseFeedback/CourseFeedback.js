import React, {Component} from "react";
import {Divider, message, Pagination, Spin} from "antd";
import {getCourseFeedback} from "../../services/course_service";
import Review from "../Review/Review";
import {DEFAULT_PAGE_SIZE, DEFAULT_PAGINATION} from "../../constants/dev_constant";

class CourseFeedback extends Component {
    state = {
        feedback: [],
        pagination: DEFAULT_PAGINATION,
        loading: true
    }

    componentDidMount() {
        this.fetchFeedback({page: 1, pageSize: DEFAULT_PAGE_SIZE});
    }

    fetchFeedback = async (param = {}) => {
        try {
            const {data} = await getCourseFeedback(this.props.courseId, param.page, param.pageSize);

            const pagination = {...this.state.pagination};
            pagination.total = data.totalItemCount;
            this.setState({
                loading: false,
                feedback: data.items,
                pagination
            });
        } catch (e) {
            message.error("Fetch reviews failed");
        }
    }

    handlePageChange = (page, pageSize) => {
        const pager = {...this.state.pagination};
        pager.current = page;
        this.setState({pagination: pager});
        this.fetchFeedback({page: page, pageSize: pageSize})
    };

    handlePageSizeChange = (current, pageSize) => {
        const pager = {...this.state.pagination};
        pager.current = 1;
        pager.pageSize = pageSize;
        this.setState({pagination: pager});
        this.fetchFeedback({page: 1, pageSize: pageSize});
    }

    render() {
        const {feedback, loading} = this.state;
        if (loading) return <Spin/>;

        return (
            <>
                <h4>Course Reviews</h4>
                <Divider/>

                {feedback.map(review => <Review key={review.id} {...review}/>)}

                <div style={{textAlign: 'right'}}>
                    <Pagination {...this.state.pagination}
                                onShowSizeChange={this.handlePageSizeChange}
                                onChange={this.handlePageChange}/>
                </div>
            </>
        );
    }
}

export default CourseFeedback;
