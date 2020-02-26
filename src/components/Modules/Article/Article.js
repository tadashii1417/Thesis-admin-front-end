import React, {Component} from "react";
import {Alert, Breadcrumb, Button, Form, message, Spin} from "antd";
import styles from "./Article.module.css";
import {Link} from "react-router-dom";
import {Icon} from "react-icons-kit";
import {Editor} from 'doodle-editor';
import ModulesConfig from "../../Curriculum/ModulesConfig";
import {ModuleType} from "../../../constants/module_constant";
import {getModule} from "../../../services/module_service";
import {httpErrorHandler} from "../../../utils/axios_util";
import {createPatch} from "../../../utils/patch_util";
import {updateArticle} from "../../../services/article_service";


class Article extends Component {
    state = {
        loading: true,
        module: {},
        content: "",
        touched: false
    };

    async componentDidMount() {
        const {params} = this.props.match;
        try {
            const {data} = await getModule(params.moduleId);
            const {instanceData: {content: {html}}} = data;
            this.setState({module: data, loading: false, content: html});
        } catch (e) {
            httpErrorHandler(e, () => {
                switch (e.code) {
                    default:
                        message.error("Something went wrong");
                }
            });
        }
    }

    handleContentChange = (value) => {
        this.setState({content: value, touched: true});
    };

    handleUpdate = async (e) => {
        e.preventDefault();
        const {module, content, touched} = this.state;
        if (touched){
            if (content !== null && content !== ""){
                try{
                    let patch = [];
                    createPatch(patch, 'content/html', content);
                    await updateArticle(module.id, patch);
                    message.success("Content has been save !");
                    this.setState({touched: false})
                }catch (e) {
                    httpErrorHandler(e, () => {
                        switch (e.code) {
                            default:
                                message.error("Something went wrong");
                        }
                    })
                }
            }
        }
        console.log(this.state.content);
    };

    render() {
        const {content, touched, module, loading} = this.state;
        if (loading) {
            return <Spin/>
        }
        console.log(this.state);
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
                            icon={ModulesConfig[ModuleType.ARTICLE].icon}
                            style={{color: ModulesConfig[ModuleType.ARTICLE].color, marginRight: "20px"}}
                        />
                        {module.title}
                    </div>
                </div>

                <div className="adminContent">
                    <div className={styles.articleContainer}>
                        {module.visibility === "private" ?
                            <Alert
                                message={"This module is unpublished"}
                                type="info"
                                style={{margin: '10px 0 20px 0'}}
                                showIcon
                                closable
                            /> : ""
                        }
                        <Form type={"vertical"} onSubmit={this.handleUpdate}>
                            <Form.Item className={'article'}>
                                <Editor initialContent={content}
                                        onChange={this.handleContentChange}/>
                            </Form.Item>
                            {
                                touched ? <div style={{textAlign: 'right', color: '#cf1322'}}>Content has not been saved yet !!!</div>:""
                            }

                            <Form.Item>
                                <i>Supported function can be found <a href={'https://katex.org/docs/supported.html'}
                                                                      target={'_blank'}>here</a></i>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Update
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>

            </>
        );
    }
}

export default Article;
