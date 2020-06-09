import React, { useState } from "react";
import axios from "axios";
import "./style.css";

import { Upload, Progress } from "antd";

const App = () => {
    const [defaultFileList, setDefaultFileList] = useState([]);
    const [progress, setProgress] = useState(0);

    const uploadImage = async options => {
        const { onSuccess, onError, file, onProgress } = options;

        const fmData = new FormData();
        const config = {
            headers: { "content-type": "multipart/form-data" },
            onUploadProgress: event => {
                const percent = Math.floor((event.loaded / event.total) * 100);
                setProgress(percent);
                if (percent === 100) {
                    setTimeout(() => setProgress(0), 1000);
                }
                onProgress({ percent: (event.loaded / event.total) * 100 });
            }
        };
        fmData.append("image", file);
        try {
            const res = await axios.post(
                "https://jsonplaceholder.typicode.com/posts",
                fmData,
                config
            );

            onSuccess("Ok");
        } catch (err) {
            onError({ err });
        }
    };

    const handleOnChange = ({ file, fileList, event }) => {
        setDefaultFileList(fileList);
    };

    return (
        <div class="testContainer">
            <Upload
                accept="image/*"
                customRequest={uploadImage}
                onChange={handleOnChange}
                listType="picture-card"
                defaultFileList={defaultFileList}>
                {defaultFileList.length >= 1 ? null : <div>Upload Button</div>}
            </Upload>
            {progress > 0 ? <Progress percent={progress} /> : null}
        </div>
    );
};

export default App;
