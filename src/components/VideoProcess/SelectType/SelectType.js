import React, {useState} from "react";
import {Button, Icon, Input, Progress, Radio, Tooltip, Upload} from 'antd';
import VideoTypes from "../../../constants/video_contant";
import styles from './SelectType.module.css';
import axios from "axios";
import {uploadVideo} from "../../../services/video_service";

const {Group} = Radio;

const SelectType = () => {
    const [defaultFileList, setDefaultFileList] = useState([]);
    const [progress, setProgress] = useState(0);

    const uploadImage = async options => {
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
            const res = await uploadVideo(file, config);
            onSuccess("Ok");
            console.log("server res: ", res);
        } catch (err) {
            const error = new Error("Some error");
            onError({error});
        }
    };

    const handleOnChange = ({file, fileList, event}) => {
        setDefaultFileList(fileList);
    };

    return <div>
        <h3>
            <Icon type="double-right" className={styles.icon}/>
            Where is your video ?
        </h3>
        <Group>
            <Radio className={styles.radioStyle} value={VideoTypes.UPLOAD}>
                <span className={styles.optionTitle}>On your computer :</span>
                <div className={styles.optionDescription}>
                    File paths : &nbsp;&nbsp;
                    <Upload
                        accept="video/*"
                        customRequest={uploadImage}
                        onChange={handleOnChange}
                        defaultFileList={defaultFileList}>
                        <Button>
                            <Icon type="upload"/> Click to Upload
                        </Button>
                        {progress > 0 ? <Progress percent={progress}/> : null}
                    </Upload>
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
                            <Input className={styles.embedLink}/>
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

    </div>

};

export default SelectType;