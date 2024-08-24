import React, {FC, useEffect, useState} from 'react';
import axios from "axios"

type Props = {
    videoUrl: string,
    title: string
}
const CoursePlayer: FC<Props> = ({videoUrl, title}) => {
    const [videoData, setVideoData] = useState({
        otp: "",
        playbackInfo: ""
    })
    useEffect(() => {
        axios.post(`${process.env.NEXT_PUBLIC_SERVER_URI}/getVdoCipherOTP`, {
            videoId: videoUrl
        }).then((res) => {
            setVideoData(res.data)
        })
    }, [videoUrl]);
    return (
        <div className={"pt-[41%] relative"}>
            {
                videoData.otp && videoData.playbackInfo !== "" && (
                    <iframe
                        src={`https://player.vdocipher.com/v2/?otp=${videoData.otp}}&playbackInfo=${videoData.playbackInfo}&player=dAk2uFCJdB0eZr0S`}
                        style={{
                            border: 0,
                            width: "90%",
                            height: "100%",
                            position: "absolute",
                            top: 0,
                            left: 0,
                        }}
                        allow="encrypted-media"
                        allowFullScreen
                    ></iframe>
                )
            }
        </div>
    );
};

export default CoursePlayer;