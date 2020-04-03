import React, { useEffect, useRef, useMemo } from "react";
import videoJs from "video.js";
import "videojs-seek-buttons";
import qualitySelector from "@silvermine/videojs-quality-selector";
import PropTypes from "prop-types";
import { HLS_MIME_TYPE, HlsSupportedQualities, SEEK_NUMBER } from "../../config/video_config";
import "./HlsPlayer.css";

qualitySelector(videoJs);

const HlsPlayer = props => {
    const { autoplay, controls, src } = props;

    let player = null;
    const videoNode = useRef(null);

    const [url, query] = useMemo(() => {
        const questionMarkIndex = src.indexOf("?");
        return [src.slice(0, questionMarkIndex), src.slice(questionMarkIndex)];
    }, [src]);

    useEffect(() => {
        player = videoJs(
            videoNode.current,
            {
                responsive: true,
                autoplay: autoplay,
                controls: controls,
                controlBar: {
                    children: [
                        "playToggle",
                        "progressControl",
                        "volumePanel",
                        "qualitySelector",
                        "fullscreenToggle"
                    ]
                }
            },
            onPlayerReady
        );

        return function() {
            if (player) {
                player.dispose();
            }

            // Renew beforeRequest hook for each new player
            videoJs.Hls.xhr.beforeRequest = undefined;
        };
    }, [src]);

    function onPlayerReady() {
        const sources = HlsSupportedQualities.map(quality => {
            // Replace master.m3u8 in link by 1080p.m3u8, 720p.m3u8, ...
            const qualityUrl = url.replace("master", quality);
            return {
                src: qualityUrl,
                type: HLS_MIME_TYPE,
                label: quality
            };
        });
        player.src(sources);

        // Init seek buttons
        player.seekButtons({
            forward: SEEK_NUMBER,
            back: SEEK_NUMBER
        });

        // Add token, expires to subsequent requests for .m3u8, .ts files
        videoJs.Hls.xhr.beforeRequest = function(options) {
            options.uri = options.uri + query;
            return options;
        };
    }

    return (
        <div className={"VideoContainer"}>
            <video
                ref={videoNode}
                className="video-js vjs-default-skin vjs-big-play-centered"
                data-setup='{"fill": true}'
            />
        </div>
    );
};

HlsPlayer.defaultProps = {
    autoplay: true,
    controls: true
};

HlsPlayer.propTypes = {
    src: PropTypes.string
};

export default HlsPlayer;
