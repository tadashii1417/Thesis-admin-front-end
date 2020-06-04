import {ModuleType} from '../../constants/module_constant';
import {book} from 'react-icons-kit/icomoon/book';
import {fileText2} from 'react-icons-kit/icomoon/fileText2';
import {folderOpen} from 'react-icons-kit/icomoon/folderOpen';
import {feed} from 'react-icons-kit/icomoon/feed';
import {enter} from 'react-icons-kit/icomoon/enter';
import {addressBook} from 'react-icons-kit/icomoon/addressBook';
import {alarm} from 'react-icons-kit/icomoon/alarm';
import {connection} from 'react-icons-kit/icomoon/connection';
import {libreoffice} from 'react-icons-kit/icomoon/libreoffice';

const ModulesConfig = {
    [ModuleType.VIDEO]: {
        icon: book,
        color: "#0e77ca",
        title: "Video"
    },
    [ModuleType.QUIZ]: {
        icon: alarm,
        color: "#00924c",
        title: "Quiz"
    },
    [ModuleType.ARTICLE]: {
        icon: fileText2,
        color: "#d73435",
        title: "Article"
    },
    [ModuleType.RESOURCE]: {
        icon: folderOpen,
        color: "#00924c",
        title: "Resource"
    },
    [ModuleType.ANNOUNCEMENT]: {
        icon: feed,
        color: "#d75000",
        title: "Announcement"
    },
    [ModuleType.ASSIGNMENT]: {
        icon: addressBook,
        color: "#533eb4",
        title: "Assignment"
    },
    [ModuleType.FORUM]: {
        icon: enter,
        color: "#00707f",
        title: "Forum"
    },
    [ModuleType.LIVESTREAM]: {
        icon: connection,
        color: "#cf1322",
        title: "Livestream"
    },
    [ModuleType.SURVEY]: {
        icon: libreoffice,
        color: "#c41d7f",
        title: "Survey"
    }
};

export default ModulesConfig;