const UPLOAD = 'upload';
const EMBED = 'embed';

const VideoTypes = {
    UPLOAD,
    EMBED
};

export const VideoStatusType = {
    UPLOADED: "UPLOADED", // initial state, video is uploaded
    STREAMIZING: "STREAMIZING", // create .m3u8, .ts files
    SAVING: "SAVING", // upload .m3u8, .ts files into hls service
    SETTING: "SETTING", // setting video's url in course service
    FINISHED: "FINISHED", // all steps are successful
    ERROR: "ERROR", // error occurred, redispatch message for later processing
    FAILED: "FAILED", // permanently failed, clean up files in streamizer service & hls service
    TERMINATED: "TERMINATED" // process is terminated by staff
};

export default VideoTypes;