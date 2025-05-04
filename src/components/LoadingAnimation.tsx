import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function LoadingAnimation() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const loadingDivRef = useRef<HTMLDivElement>(null);
    const [duration, setDuration] = useState(0);
    const [value, setValue] = useState(0);

    const handleLoadedMetadata = () => {
        if (videoRef?.current) {
            videoRef.current.play();
            videoRef.current.pause();
            setDuration(videoRef?.current?.duration);
        }
        setValue(0);
    };

    useEffect(() => {
        if (!duration) return;

        const timeline = gsap.timeline();
        if (videoRef.current) {
            timeline.to(
                videoRef.current,
                {
                    currentTime: (23 * duration) / 100,
                    duration: 0.3,
                    ease: "sin.inOut",
                    onUpdate: () => {
                        if (videoRef.current) {
                            setValue(
                                Math.round(
                                    (videoRef.current.currentTime * 100) /
                                        duration
                                )
                            );
                        }
                    },
                },
                0
            );
            timeline.to(
                videoRef.current,
                {
                    currentTime: (68 * duration) / 100,
                    duration: 0.9,
                    ease: "sin.inOut",
                    onUpdate: () => {
                        if (videoRef.current) {
                            setValue(
                                Math.round(
                                    (videoRef.current.currentTime * 100) /
                                        duration
                                )
                            );
                        }
                    },
                },
                0.4
            );
            timeline.to(
                videoRef.current,
                {
                    currentTime: (79 * duration) / 100,
                    duration: 0.4,
                    ease: "sin.inOut",
                    onUpdate: () => {
                        if (videoRef.current) {
                            setValue(
                                Math.round(
                                    (videoRef.current.currentTime * 100) /
                                        duration
                                )
                            );
                        }
                    },
                },
                1.4
            );
            timeline.to(
                videoRef.current,
                {
                    currentTime: (100 * duration) / 100,
                    duration: 0.5,
                    ease: "sin.inOut",
                    onUpdate: () => {
                        if (videoRef.current) {
                            setValue(
                                Math.round(
                                    (videoRef.current.currentTime * 100) /
                                        duration
                                )
                            );
                        }
                    },
                },
                1.9
            );
        }
    }, [duration]);

    useEffect(() => {
        if (value === 100 && loadingDivRef.current) {
            gsap.to(loadingDivRef.current, {
                transform: "translateY(-100vh)",
                duration: 1,
                ease: "power1.inOut",
            });
        }
    }, [value]);
    return (
        <div
            ref={loadingDivRef}
            className="fixed top-0 z-50 w-[100vw] h-[100vh] bg-black flex flex-col justify-center items-center">
            <video
                ref={videoRef}
                src={`${window.location.origin}/jadeStarAnimation.mp4`}
                muted
                playsInline
                preload="auto"
                style={{ width: "100%", maxWidth: "100px" }}
                controls={false}
                autoPlay={false}
                onLoadedMetadata={handleLoadedMetadata}></video>
            <h1 className="text-white text-3xl font-display italic">
                {value}%
            </h1>
        </div>
    );
}
