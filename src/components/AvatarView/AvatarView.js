import React, {Fragment} from "react";
import styles from "../Profile/Profile.module.css";
import {Button, Upload} from "antd";
import {defaultAvatar} from "../../constants/dev_constant";

export default function ({avatar, handleUpdateAvatar}) {
    const ava = avatar ? avatar : defaultAvatar;

    return (
        <Fragment>
            <div className={styles.avatar_title}>
                Avatar
            </div>
            <div className={styles.avatar}>
                <img src={ava} alt="avatar"/>
            </div>
            <Upload fileList={[]}
                    beforeUpload={() => false}
                    onChange={(upload) => handleUpdateAvatar(upload)}
                    multiple={false}>
                <div className={styles.button_view}>
                    <Button icon="upload">
                        Change Avatar
                    </Button>
                </div>
            </Upload>
        </Fragment>
    );
}