import React, {Component} from "react";
import PieChart from "../../PieChart/PieChart";
import BarChart from "../../BarChart/BarChart";
import {fetchQuizResult} from "../../../services/quiz_service";
import {httpErrorHandler} from "../../../utils/axios_util";
import {message} from "antd";
import Loading from "../../Loading/Loading";

function convertScoresToStatistic(scores = [1, 3, 3, 2.7, 2.5, 5, 8, 10.1, 6]) {
    scores.sort(function (a, b) {
        return a - b;
    });
    const maxScore = Math.floor(Math.max(...scores));
    let data = [];
    for (let i = 0; i <= maxScore; i++) {
        data.push({range: `[${i}-${i + 1}]`, count: 0});
    }
    for (let score of scores) {
        data[Math.floor(score)].count += 1;
    }
    return data;
}


class QuizStatistic extends Component {
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

    render() {
        const {loading, results} = this.state;
        if (loading) return <Loading/>;

        const passFailData = [
            {
                item: 'Pass',
                count: 0,
            },
            {
                item: 'Failed',
                count: 0,
            }
        ];
        const scoreArray = [];

        for (let res of results) {
            const {result: {finalMark, passed}} = res;
            scoreArray.push(finalMark);
            if (passed) {
                passFailData[0].count += 1;
            } else {
                passFailData[1].count += 1;
            }
        }

        const scoreStatistic = convertScoresToStatistic(scoreArray);
        return (
            <div>
                <h4>1. Chart describe between score range and number of student</h4>
                <BarChart data={scoreStatistic}/>
                <h4>2. Chart describe percent of pass-fail student</h4>
                <PieChart data={passFailData}/>
            </div>
        );
    }
}

export default QuizStatistic;
