const QUIZ = "quiz";
const FORUM = "forum";
const VIDEO = "video";
const ARTICLE = "article";
const RESOURCE = "resource";
const ASSIGNMENT = "assignment";
const ANNOUNCEMENT = "announcement";
const LIVESTREAM = "livestream";

export const ModuleType = {
    QUIZ,
    FORUM,
    VIDEO,
    ARTICLE,
    RESOURCE,
    ASSIGNMENT,
    ANNOUNCEMENT,
    LIVESTREAM
};

export const CurriculumPreviewableModuleType = [
    ModuleType.ARTICLE,
    ModuleType.RESOURCE,
    ModuleType.VIDEO
];

export const LivestreamStatus = {
    CREATED: "created",
    RUNNING: "running",
    ENDED: "ended",
    RECORDED: "recorded",
};