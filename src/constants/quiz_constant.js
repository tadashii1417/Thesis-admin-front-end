const LAST_ATTEMPT = "last_attempt";
const ATTEMPT_AVERAGE = "attempt_average";

export const GradingPolicy = {
    LAST_ATTEMPT,
    ATTEMPT_AVERAGE
};

const INPUT = "input";
const SINGLE_ANSWER = "single_answer";
const MULTIPLE_ANSWER = "multiple_answer";

export const QuestionType = {
    INPUT,
    SINGLE_ANSWER,
    MULTIPLE_ANSWER
};

export const QuestionTypeMapping = {
    [INPUT]: "Input",
    [SINGLE_ANSWER]: "Single answer",
    [MULTIPLE_ANSWER]: "Multiple answer"
}
