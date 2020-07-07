import {Card, Result} from "antd";
import React from "react";

export default function ({promoVideoUrl}) {
    return (
        <div>
            <h4>Promotional video</h4>
            {promoVideoUrl ?
                (<Card size="small"
                       actions={null}
                       cover={<iframe title="promotional video" src={promoVideoUrl} width="560"
                                      height="349"/>}/>
                ) : (<Result status="404" title="404" subTitle="No promotional video found."/>)}
        </div>
    );

}
