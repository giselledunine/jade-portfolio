import { useRef, useState } from "react";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import { ScrollControls, Scroll } from "@react-three/drei";
import { Slider } from "./components/ui/slider";

function App() {
    const [value, setValue] = useState(0);
    const [duration, setDuration] = useState(0);
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleLoadedMetadata = () => {
        console.log("video", videoRef?.current?.duration);
        if (videoRef?.current) {
            videoRef.current.play();
            videoRef.current.pause();
            setDuration(videoRef?.current?.duration);
        }
        setValue(0);
    };

    const handleSlideChange = (time: number[]) => {
        const newTime = time[0];
        console.log("newTime", newTime);
        setValue(newTime);
        if (videoRef.current) {
            videoRef.current.currentTime = newTime;
        }
    };

    return (
        <div className="w-[100vw] h-[100vh] touch-pan-y">
            <Canvas>
                {/* <color attach="background" args={["000000"]} /> */}
                <ScrollControls damping={0.3} pages={5} enabled={true}>
                    <Scroll html style={{ width: "100%" }}>
                        <div className="flex flex-col md:flex-row justify-center items-center w-[100vw] h-[100vh] bg-black">
                            <video
                                ref={videoRef}
                                src={`${window.location.origin}/jadeStarAnimation.mp4`}
                                muted
                                playsInline
                                preload="auto"
                                style={{ width: "100%", maxWidth: "500px" }}
                                controls={false}
                                autoPlay={false}
                                onLoadedMetadata={handleLoadedMetadata}></video>
                            <Slider
                                defaultValue={[0]}
                                max={duration || 0}
                                min={0}
                                step={0.01}
                                onValueChange={handleSlideChange}></Slider>
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
