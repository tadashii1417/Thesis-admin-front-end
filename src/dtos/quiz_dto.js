import {GradingPolicy} from "../constants/quiz_constant";
import moment from "moment";
import config from "../config";

export class QuizDto {
    static fromGradingPolicyToText(policy) {
        switch (policy) {
            case GradingPolicy.LAST_ATTEMPT:
                return "Last Attempt";
            case GradingPolicy.ATTEMPT_AVERAGE:
                return "Average Attempts";
            default:
                return ""
        }
    }

    static toQuizSettingDto(data) {
        let quizDto = new QuizDto();

        quizDto.description = data.description;
        quizDto.gradingPolicy = QuizDto.fromGradingPolicyToText(data.gradingPolicy);
        quizDto.shuffleQuestions = data.shuffleQuestions ? "True" : "False";
        quizDto.duration = data.duration || ".";
        quizDto.passThreshold = data.passThreshold;
        quizDto.numAttempt = data.numAttempt || ".";
        quizDto.openAt = data.openAt ? moment(data.openAt, config.timeFormat).format('HH:mm:ss DD/MM/YYYY') : ".";
        quizDto.closeAt = data.closeAt ? moment(data.closeAt, config.timeFormat).format('HH:mm:ss DD/MM/YYYY') : ".";

        return quizDto;
    }
}