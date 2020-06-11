import React, {Component} from "react";
import {message} from "antd";
import {getModule} from "../../../services/module_service";
import {httpErrorHandler} from "../../../utils/axios_util";
import {isHlsVideo} from "../../../utils/video_util";
import HlsPlayer from "../../HlsPlayer/HlsPlayer";
import styles from './VideoFinished.module.css';
import Loading from "../../Loading/Loading";

class VideoFinished extends Component {
    state = {
        loading: true,
        module: {}
    };

    async componentDidMount() {
        try {
            const {moduleId} = this.props;
            const {data} = await getModule(moduleId);
            this.setState({module: data, loading: false});
        } catch (e) {
            httpErrorHandler(e, () => {
                switch (e.code) {
                    default:
                        message.error("Failed to load module")
                }
            })
        }
    }

    render() {
        const {loading, module: {instanceData}} = this.state;
        if (loading) return <Loading/>;


        if (!instanceData) {
            return "No video";
        }

        return <div className={styles.videoContainer}>
            {
                isHlsVideo(instanceData.url) ?
                    <HlsPlayer src={instanceData.url}/> :
                    <iframe title="promotional video" src={instanceData.url} width="100%" height={500}/>
            }
        </div>;
    }
}

export default VideoFinished;
