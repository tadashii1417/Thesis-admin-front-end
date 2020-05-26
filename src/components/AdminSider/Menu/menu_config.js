export default [
    {
        display: "Dashboard",
        name: "dashboard",
        icon: "dashboard",
        path: "/",
        onlyAdmin: true,
        routes: []
    },
    {
        display: "Doodle",
        name: "doodle",
        icon: "idcard",
        routes: [
            {
                display: "Courses",
                path: "/courses",
                name: "courses",
            },
            {
                name: "lessons",
                display: "Lessons",
                path: "/dashboard",
            },
            {
                name: "quizzes",
                display: "Quizzes",
                path: "/quizzes",
            },
            {
                name: "questions",
                display: "Questions",
                path: "/questions",
            },
            {
                name: "statistics",
                display: "Statistic",
                path: "/statistic",
            }
        ]
    },
    {
        display: "Account Center",
        name: "account-center",
        onlyAdmin: true,
        icon: "user",
        path: "/accounts",
        routes: []
    },
    {
        display: "My profile",
        name: "profile",
        icon: "credit-card",
        path: "/profile",
        routes: []
    },
    {
        display: "Feedback",
        name: "feedback",
        icon: "alert",
        path: "/",
        routes: []
    },
    {
        display: "Help",
        name: "tool",
        icon: "question-circle",
        path: "/",
        routes: []
    }
];
