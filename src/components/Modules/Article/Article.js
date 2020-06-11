import React, {Component} from "react";
import {message} from "antd";
import styles from "./Article.module.css";
import {ModuleType} from "../../../constants/module_constant";
import {getModule, updateModule} from "../../../services/module_service";
import {httpErrorHandler} from "../../../utils/axios_util";
import {createPatch} from "../../../utils/patch_util";
import {updateArticle} from "../../../services/article_service";
import ModuleLayout from "../../ModuleLayout/ModuleLayout";
import ArticleForm from "../../Forms/ArticleForm/ArticleForm";
import Loading from "../../Loading/Loading";


class Article extends Component {
    state = {
        loading: true,
        module: {},
        content: "",
        touched: false,
    };

    handleEditModule = async (patch) => {
        const {module} = this.state;
        let key = "update-module";
        try {
            message.loading({content: "Loading", key});
            const {data} = await updateModule(module.id, patch);
            data.instanceData = module.instanceData;
            this.setState({module: data});
            message.success({content: "Module has been updated", key});
        } catch (e) {
            httpErrorHandler(e, () => {
                message.error({content: "Something went wrong", key});
            })
        }
    };

    async componentDidMount() {
        const {params} = this.props.match;
        try {
            const {data} = await getModule(params.moduleId);
            const {instanceData: {content}} = data;
            this.setState({module: data, loading: false, content: content});
        } catch (e) {
            httpErrorHandler(e, () => {
                message.error("Something went wrong");
            });
        }
    }

    handleContentChange = (value) => {
        this.setState({content: value, touched: true});
    };

    handleUpdate = async (e) => {
        e.preventDefault();
        const {module, content, touched} = this.state;
        if (touched) {
            let key = "update-article";

            if (content != null && content !== "") {
                try {
                    let patch = [];
                    createPatch(patch, 'content', content);

                    message.loading({content: "Loading", key});
                    await updateArticle(module.id, patch);
                    message.success({content: "Content has been saved !", key});
                    this.setState({touched: false})
                } catch (e) {
                    httpErrorHandler(e, () => {
                        message.error({content: "Something went wrong", key});
                    })
                }
            }
        }
    };

    render() {
        const {content, touched, module, loading} = this.state;
        if (loading) return <Loading/>;
        const {match: {params: {slug}}, location: {state: {courseName}}} = this.props;

        return (
            <ModuleLayout
                slug={slug}
                courseName={courseName}
                moduleType={ModuleType.ARTICLE}
                handleEditModule={this.handleEditModule}
                module={module}>

                <div className={styles.articleContainer}>
                    <ArticleForm handleUpdate={this.handleUpdate}
                                 handleContentChange={this.handleContentChange}
                                 content={content}
                                 touched={touched}/>
                </div>

            </ModuleLayout>
        );
    }
}

export default Article;
