import * as ModuleType from '../../constants/Course.constant';
import {book} from 'react-icons-kit/icomoon/book';
import {fileText2} from 'react-icons-kit/icomoon/fileText2';
import {folderOpen} from 'react-icons-kit/icomoon/folderOpen';
import {feed} from 'react-icons-kit/icomoon/feed';
import {enter} from 'react-icons-kit/icomoon/enter';
import {addressBook} from 'react-icons-kit/icomoon/addressBook';
import {alarm} from 'react-icons-kit/icomoon/alarm';

const activities = [
    {
        type: ModuleType.VIDEO,
        icon: book,
        color: "#108EE9",
        title: "Video"
    },
    {
        type: ModuleType.QUIZ,
        icon: alarm,
        color: "#2BA8A6",
        title: "Quiz"
    },
    {
        type: ModuleType.CONTENT,
        icon: fileText2,
        color: "#f46e65",
        title: "Article"
    },
    {
        type: ModuleType.RESOURCE,
        icon: folderOpen,
        color: "#3dbd7d",
        title: "Resource"
    },
    {
        type: ModuleType.ANNOUNCEMENT,
        icon: feed,
        color: "#f78e3d",
        title: "Announcement"
    },
    {
        type: ModuleType.ASSIGNMENT,
        icon: addressBook,
        color: "#948aec",
        title: "Assignment"
    },
    {
        type: ModuleType.FORUM,
        icon: enter,
        color: "#00a2ae",
        title: "Forum"
    }
];

export default activities;