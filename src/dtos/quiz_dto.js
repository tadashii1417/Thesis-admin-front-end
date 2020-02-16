import {GradingPolicy} from "../constants/quiz_constant";

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
        quizDto.shuffleAnswer = data.shuffleAnswer ? "False" : "True";
        quizDto.duration = data.duration || ".";
        quizDto.passThreshold = data.passThreshold;
        quizDto.numAttempt = data.numAttempt || ".";
        quizDto.openAt = data.openAt ? data.openAt : ".";
        quizDto.closeAt = data.closeAt ? data.closeAt : ".";

        return quizDto;
    }
}