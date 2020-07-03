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
        quizDto.shuffleQuestions = data.shuffleQuestions ? "Yes" : "No";
        quizDto.duration = data.duration != null ? data.duration : "No limit";
        quizDto.passThreshold = data.passThreshold != null ? data.passThreshold : "No limit" ;
        quizDto.numAttempt = data.numAttempt != null ? data.numAttempt : "No limit";
        quizDto.openAt = data.openAt ? moment(data.openAt, config.timeFormat).format('HH:mm:ss DD/MM/YYYY') : "N/A";
        quizDto.closeAt = data.closeAt ? moment(data.closeAt, config.timeFormat).format('HH:mm:ss DD/MM/YYYY') : "N/A";

        return quizDto;
    }
}
