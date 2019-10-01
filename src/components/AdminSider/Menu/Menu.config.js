export default [
  {
    display: "Dashboard",
    name: "dashboard",
    icon: "dashboard",
    path: "/admin/dashboard",
    component: "../../dashboard",
    routes: [
      {
        display: "Home",
        name: "home",
        path: "/dashboard/home",
        component: "homeComponent"
      },
      {
        display: "Updates",
        name: "update",
        path: "/dashboard/updates",
        component: "updateComponent"
      }
    ]
  },
  {
    display: "Doodle",
    name: "doodle",
    icon: "user",
    path: "/admin/dashboard",
    component: "../../dashboard",
    routes: [
      {
        display: "Courses",
        path: "/dashboard/home",
        name: "courses",
        component: "homeComponent"
      },
      {
        name: "lessons",
        display: "Lessons",
        path: "/dashboard/updates",
        component: "updateComponent"
      },
      {
        name: "quizzes",
        display: "Quizzes",
        path: "/dashboard/updates",
        component: "updateComponent"
      },
      {
        name: "questions",
        display: "Questions",
        path: "/dashboard/updates",
        component: "updateComponent"
      },
      {
        name: "statistics",
        display: "Statistic",
        path: "/dashboard/updates",
        component: "updateComponent"
      }
    ]
  },
  {
    display: "Media",
    name: "media",
    icon: "folder-open",
    path: "/admin/dashboard",
    component: "../../dashboard",
    routes: []
  },
  {
    display: "Setting",
    name: "setting",
    icon: "setting",
    path: "/admin/dashboard",
    component: "../../dashboard",
    routes: []
  },
  {
    display: "Appearance",
    name: "appearance",
    icon: "laptop",
    path: "/admin/dashboard",
    component: "../../dashboard",
    routes: []
  },
  {
    display: "Tools",
    name: "tool",
    icon: "tool",
    path: "/admin/dashboard",
    component: "../../dashboard",
    routes: []
  }
];
