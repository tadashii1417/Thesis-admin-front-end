import styles from "../../containers/CourseDetail/CourseDetail.module.css";
import {Button, Icon, Result, Upload} from "antd";
import React from "react";

export default function ({banner, handleUpdateBanner}) {
    return (
        <div>
            <h4>Course banner image</h4>
            {
                banner ?
                    (<img className={styles.imgBanner} alt="example" src={banner.origin}/>) :
                    (<Result status="404" title="404" subTitle="No banner found."/>)
            }

            <Upload name="banner"
                    onChange={info => {
                        info.file.status = "done";
                    }}
                    customRequest={options => {
                        handleUpdateBanner(options.file);
                    }}>
                <Button className={styles.uploadBtn}>
                    <Icon type="upload"/> Click to update
                </Button>
            </Upload>
        </div>);
}
