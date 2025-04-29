import { useEffect, useRef, useState } from "react";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import { ScrollControls, Scroll } from "@react-three/drei";
// import { Slider } from "./components/ui/slider";
// import { useProgress } from "@react-three/drei";
import gsap from "gsap";

function App() {
    const [value, setValue] = useState(0);
    const [duration, setDuration] = useState(0);
    const videoRef = useRef<HTMLVideoElement>(null);
    const timeline = gsap.timeline();
    // const { progress } = useProgress();

    const handleLoadedMetadata = () => {
        console.log("video", videoRef?.current?.duration);
        if (videoRef?.current) {
            videoRef.current.play();
            videoRef.current.pause();
            setDuration(videoRef?.current?.duration);
        }
        setValue(0);
    };

    // const handleSlideChange = (time: number[]) => {
    //     const newTime = Math.round((time[0] * 100) / duration);
    //     console.log("newTime", newTime);
    //     setValue(newTime);
    //     if (videoRef.current) {
    //         videoRef.current.currentTime = time[0];
    //     }
    // };

    useEffect(() => {
        if (videoRef.current) {
            timeline.to(
                videoRef.current,
                {
                    currentTime: (23 * duration) / 100,
                    duration: 0.5,
                    ease: "sine.inOut",
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
                    duration: 1.5,
                    ease: "sine.inOut",
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
                0.7
            );
            timeline.to(
                videoRef.current,
                {
                    currentTime: (79 * duration) / 100,
                    duration: 0.4,
                    ease: "sine.inOut",
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
                2.4
            );
            timeline.to(
                videoRef.current,
                {
                    currentTime: (100 * duration) / 100,
                    duration: 0.5,
                    ease: "sine.inOut",
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
                3.1
            );
        }
    }, [duration]);

    return (
        <div className="w-[100vw] h-[100vh] touch-pan-y">
            <Canvas>
                {/* <color attach="background" args={["000000"]} /> */}
                <ScrollControls damping={0.3} pages={5} enabled={true}>
                    <Scroll html style={{ width: "100%" }}>
                        <div className="flex flex-col justify-center items-center w-[100vw] h-[100vh] bg-black">
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
                            {/* <Slider
                                defaultValue={[0]}
                                max={duration || 0}
                                min={0}
                                step={0.01}
                                onValueChange={handleSlideChange}></Slider> */}
                            <h1 className="text-white text-4xl font-display italic">
                                {value}%
                            </h1>
                        </div>
                        <div className="flex justify-center items-center w-[100vw] h-[100vh] bg-white">
                            <h1 className="text-black">Kaidi</h1>
                        </div>
                        <div className="flex justify-center items-center w-[100vw] h-[100vh] bg-black">
                            <h1 className="text-white">Portfolio</h1>
                        </div>
                    </Scroll>
                </ScrollControls>
            </Canvas>
        </div>
    );
}

export default App;
