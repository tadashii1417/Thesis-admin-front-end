import {VideoUrlType} from "../constants/video_constant";

export function isHlsVideo(data) {
    return data.type === VideoUrlType.STREAMIZER_SERVICE;
}
