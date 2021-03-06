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
                name: "questionBank",
                display: "Question Bank",
                path: "/questions",
            }
        ]
    },
    {
        display: "Semester",
        name: "semester",
        onlyAdmin: true,
        icon: "appstore",
        path: "/semesters",
        routes: []
    },
    {
        display: "Orders",
        name: "orders",
        onlyAdmin: true,
        icon: "dollar",
        path: "/orders",
        routes: []
    },
    {
        display: "Departments",
        name: "department",
        onlyAdmin: true,
        icon: "bank",
        path: "/departments",
        routes: []
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
