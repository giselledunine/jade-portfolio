import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import "./App.css";
import { Canvas, useThree } from "@react-three/fiber";
import {
    ScrollControls,
    Scroll,
    MeshPortalMaterial,
    Text,
    Preload,
    useScroll,
} from "@react-three/drei";
// import { Slider } from "./components/ui/slider";
// import { useProgress } from "@react-three/drei";
import gsap from "gsap";

function App() {
    const [value, setValue] = useState(0);
    const [duration, setDuration] = useState(0);
    const [active, setActive] = useState(0);
    const videoRef = useRef<HTMLVideoElement>(null);
    const loadingDivRef = useRef<HTMLDivElement>(null);
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
        if (value == 100) {
            gsap.to(loadingDivRef.current, {
                transform: "translateY(-100vh)",
                duration: 1,
                ease: "power1.inOut",
            });
            // gsap.to(nameRef.current, {
            //     transform: "translate(-35vw, -40vh)",
            //     scale: 0.3,
            //     duration: 2,
            //     ease: "power1.out",
            //     delay: 2,
            // });
        }
    }, [value]);

    useEffect(() => {
        const timeline = gsap.timeline();
        if (videoRef.current) {
            timeline.to(
                videoRef.current,
                {
                    currentTime: (23 * duration) / 100,
                    duration: 0.3,
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
                    duration: 0.9,
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
                0.4
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
                1.4
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
                1.9
            );
        }
    }, [duration]);

    return (
        <div className="w-[100vw] h-[100vh] touch-pan-y">
            <Canvas camera={{ fov: 75, position: [0, 0, 5] }}>
                {/* <CameraControls enabled={cameraMouv}></CameraControls> */}
                <color attach="background" args={["#F2FFF4"]} />
                <ScrollControls damping={0.3} pages={5} enabled={true}>
                    <Scroll>
                        <ProjectPortal
                            active={active}
                            setActive={setActive}></ProjectPortal>
                    </Scroll>
                    <Scroll
                        html
                        style={{
                            width: "100%",
                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                        }}>
                        <div
                            ref={loadingDivRef}
                            className="absolute flex flex-col justify-center items-center w-[100vw] h-[100vh] bg-black">
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
                            <h1 className="text-white text-3xl font-display italic">
                                {value}%
                            </h1>
                        </div>
                        <div className="flex justify-center items-center w-[100vw] h-[100vh]">
                            {/* <h1
                                ref={nameRef}
                                className="text-black text-9xl font-display">
                                Kaïdi Jade
                            </h1> */}
                        </div>
                        <div className="flex justify-center items-center w-[100vw] h-[100vh] bg-black">
                            <h1 className="text-white">Portfolio</h1>
                        </div>
                    </Scroll>
                </ScrollControls>
                <CameraMouv active={active}></CameraMouv>
                <Preload all></Preload>
            </Canvas>
        </div>
    );
}

function CameraMouv({ active }: { active: number }) {
    const { camera, scene } = useThree();
    useEffect(() => {
        const object = scene.getObjectByName("01");
        console.log("active", active);
        if (active === 1 && object) {
            gsap.to(camera.position, {
                x: 0,
                y: 0,
                z: 2,
                duration: 0.8,
                ease: "power3.inOut",
                onUpdate: () => {
                    camera.lookAt(0, 0, 0);
                },
            });
        }
    });
    return <></>;
}

const ProjectPortal = ({
    active,
    setActive,
}: {
    active: number;
    setActive: Dispatch<SetStateAction<number>>;
}) => {
    const scroll = useScroll();
    console.log("scroll", scroll);
    const portalMaterialRef = useRef<any>(null);
    const handleActive = (id: number) => {
        setActive(id);
    };

    useEffect(() => {
        if (active === 1 && portalMaterialRef.current) {
            gsap.to(portalMaterialRef.current, {
                blend: 1,
                duration: 0.3,
                delay: 0.1,
                ease: "power1.inOut",
            });
        }
    }, [active]);

    return (
        <group>
            <Text
                font="/MinionPro-Bold.otf"
                fontSize={0.4}
                color={"#F0F0F0"}
                position={[-0.2, 1.7, 0.01]}
                material-toneMapped={false}
                anchorY="top"
                anchorX="right">
                La Liste Rouge
            </Text>
            <Text
                font="/MinionPro-Bold.otf"
                fontSize={0.2}
                color={"#F0F0F0"}
                lineHeight={0.8}
                position={[-2.25, 1.2, 0.01]}
                material-toneMapped={false}
                anchorY="top"
                anchorX="right">
                2023
            </Text>
            <mesh
                name={"01"}
                position={[0, 0, 0]}
                onDoubleClick={() => handleActive(1)}>
                <planeGeometry args={[6, 4]} />
                <MeshPortalMaterial
                    ref={portalMaterialRef}
                    side={2}
                    resolution={512}
                    blur={0}>
                    <color attach="background" args={["#000000"]} />

                    <mesh position={[0, 0, 0]}>
                        <planeGeometry args={[1, 1, 1]} />
                        <meshBasicMaterial color={"#A4564C"} />
                    </mesh>
                </MeshPortalMaterial>
            </mesh>
        </group>
    );
};

export default App;
