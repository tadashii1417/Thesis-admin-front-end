import React, {Component} from "react";
import {Avatar, Breadcrumb, Divider, Icon as AIcon, Table} from "antd";
import {Link} from "react-router-dom";
import {Icon} from "react-icons-kit";

import styles from './ForumTopic.module.css';
import ModulesConfig from "../Curriculum/ModulesConfig";
import {ModuleType} from "../../constants/module_constant";
import {defaultAvatar} from "../../constants/dev_constant";

class ForumTopic extends Component {
    state = {
        loading: false,
        module: {
            title: "This is a sample forum",
            instanceData: {
                intro: "This is a sample introduction"
            }
        },
        answers: [
            {
                content: "Cho minh hoi bai nay lam sao :v huhu",
                author: "Nguyen van a",
                authorUrl: defaultAvatar,
                created: "Wednesday, 15 January 2020, 7:04 PM"
            },
            {
                content: "Bai de vcl ma ko biet, ngu vl \n haha \n hu",
                author: "Nguyen van a",
                authorUrl: defaultAvatar,
                created: "Wednesday, 15 January 2020, 7:04 PM"
            }
        ]
    };

    render() {
        const {module, loading, answers} = this.state;
        const {instanceData: {intro}} = module;
        // if (loading) {
        //     return <Spin/>
        // }
        const {match, location} = this.props;
        const query = new URLSearchParams(location.search);

        return (
            <>
                <div className={styles.header}>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to={"/courses"}>Courses</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to={"/courses/" + match.params.slug}>
                                {query.get('course')}
                            </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>{module.title}</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className={styles.heading}>
                        <Icon
                            icon={ModulesConfig[ModuleType.FORUM].icon}
                            className={'circle-icon'}
                            style={{color: ModulesConfig[ModuleType.FORUM].color, marginRight: "20px"}}
                        />
                        {module.title}
                    </div>
                    <div className={styles.description}>
                        {intro}
                    </div>
                </div>

                <div className="adminContent">

                    {answers.map(answer => (
                        <div className={styles.commentContainer}>
                            <div className={styles.userInfo}>
                                <Avatar src={answer.authorUrl} className={styles.avatar}/>
                                <div className={styles.authorName}>
                                    {answer.author}
                                </div>
                            </div>
                            <div className={styles.userComment}>
                                <div className={styles.time}>
                                    {answer.created}
                                </div>
                                <div className={styles.comment}>
                                    {answer.content}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </>
        );
    }
}

export default ForumTopic;
