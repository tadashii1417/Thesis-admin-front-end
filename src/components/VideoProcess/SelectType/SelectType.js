import React, {useState} from "react";
import {Button, Icon, Input, message, Progress, Radio, Tooltip, Upload} from 'antd';
import VideoTypes from "../../../constants/video_contant";
import styles from './SelectType.module.css';
import {setVideoUrl, uploadVideo} from "../../../services/video_service";
import {httpErrorHandler} from "../../../utils/axios_util";

const {Group} = Radio;

const SelectType = (props) => {
    const [fileList, setFileList] = useState([]);
    const [radioValue, setRadioValue] = useState(VideoTypes.UPLOAD);
    const [progress, setProgress] = useState(0);
    const [embedUrl, setEmbedUrl] = useState("");
    const {moduleId, setCurrent} = props;

    const uploadVideoFromLocal = async options => {
        const {onSuccess, onError, file, onProgress} = options;
        const config = {
            headers: {"content-type": "multipart/form-data"},
            onUploadProgress: event => {
                const percent = Math.floor((event.loaded / event.total) * 100);
                setProgress(percent);
                if (percent === 100) {
                    setTimeout(() => setProgress(0), 1000);
                }
                onProgress({percent: (event.loaded / event.total) * 100});
            }
        };

        try {
            await uploadVideo(file, moduleId, config);
            message.success("Video has been uploaded.");
            onSuccess("Ok");
            setCurrent(1);
        } catch (err) {
            const error = new Error("Some error");
            message.error("Upload video failed.");
            onError({error});
        }
    };

    const handleOnChangeUpload = ({file, fileList, event}) => {
        let nFileList = [...fileList];
        nFileList = nFileList.slice(-1);
        setFileList(nFileList);
    };

    const handleURLChange = (e) => {
        setRadioValue(VideoTypes.EMBED);
        setEmbedUrl(e.target.value);
    };

    const handleRadioChange = (e) => {
        setRadioValue(e.target.value);
    };

    const handleClickNext = async (e) => {
        if (!embedUrl) {
            message.error("Please input video url or upload file");
            return;
        }
        try {
            await setVideoUrl(embedUrl, moduleId);
            setCurrent(2);
        } catch (e) {
            httpErrorHandler(e, () => {
                switch (e.code) {
                    default:
                        message.error("Something went wrong")
                }
            })
        }
    };

    return <div className={styles.stepsContent}>
        <h3>
            <Icon type="double-right" className={styles.icon}/>
            Where is your video ?
        </h3>
        <Group value={radioValue} onChange={handleRadioChange} className={styles.radioBox}>
            <Radio className={styles.radioStyle} value={VideoTypes.UPLOAD}>
                <span className={styles.optionTitle}>On your computer :</span>
                <div className={styles.optionDescription}>
                    <div>
                        File paths : &nbsp;&nbsp;
                        <Upload
                            accept="video/*"
                            multiple={false}
                            customRequest={uploadVideoFromLocal}
                            onChange={handleOnChangeUpload}
                            showUploadList={false}
                            fileList={fileList}
                            defaultFileList={fileList}>
                            <Button>
                                <Icon type="upload"/> Click to Upload
                            </Button>
                        </Upload>
                    </div>

                    <div>
                        {progress > 0 ?
                            <Progress strokeColor={{
                                '0%': '#108ee9',
                                '100%': '#87d068',
                            }} percent={progress}/> : null}
                    </div>
                </div>
            </Radio>

            <Radio className={styles.radioStyle} value={VideoTypes.EMBED}>
                <span className={styles.optionTitle}>
                    Already deploy to a web server, like Youtube, Vimeo
                </span>
                <div className={styles.optionDescription}>
                    <div className={styles.left}>
                        URL :
                    </div>

                    <div className={styles.right}>
                        <Tooltip title={"Embed link not the URL of the video."}>
                            <Input className={styles.embedLink} value={embedUrl} onChange={handleURLChange}/>
                        </Tooltip>
                        <div className={styles.notes}>
                            Examples :
                            <ul>
                                <li>https://www.youtube.com/embed/a0qC7lG3Vfc</li>
                                <li>https://player.vimeo.com/video/402243207</li>
                            </ul>
                        </div>
                    </div>
                    <p className={styles.clear}/>
                </div>
            </Radio>
        </Group>
        <div className={styles.nextButton}>
            <Button type="primary" onClick={handleClickNext}>Next</Button>
        </div>
    </div>

};

export default SelectType;