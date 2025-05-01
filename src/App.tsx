import {
    Dispatch,
    SetStateAction,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from "react";
import "./App.css";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
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
import * as THREE from "three";

function App() {
    const [value, setValue] = useState(0);
    const [duration, setDuration] = useState(0);
    const [active, setActive] = useState("");
    const videoRef = useRef<HTMLVideoElement>(null);
    const loadingDivRef = useRef<HTMLDivElement>(null);
    const linksRef = useRef<HTMLDivElement>(null);
    const backRef = useRef<HTMLAnchorElement>(null);
    // const { progress } = useProgress();

    const handleLoadedMetadata = () => {
        if (videoRef?.current) {
            videoRef.current.play();
            videoRef.current.pause();
            setDuration(videoRef?.current?.duration);
        }
        setValue(0);
    };

    useEffect(() => {
        if (value === 100 && loadingDivRef.current) {
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
        if (!duration) return;

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

    useEffect(() => {
        if (active !== "") {
            gsap.to(linksRef.current, {
                color: "white",
                duration: 0.3,
                ease: "power3.inOut",
            });
            gsap.to(backRef.current, {
                opacity: 1,
                duration: 0.3,
                ease: "power3.inOut",
            });
        } else {
            gsap.to(linksRef.current, {
                color: "black",
                duration: 0.3,
                ease: "power3.inOut",
            });
            gsap.to(backRef.current, {
                opacity: 0,
                duration: 0.3,
                ease: "power3.inOut",
            });
        }
    });

    return (
        <div className="w-[100vw] h-[100vh] touch-pan-y">
            <div
                ref={loadingDivRef}
                className="absolute flex flex-col justify-center items-center w-[100vw] h-[100vh] z-50 bg-black">
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
            <div className="fixed w-full flex z-40 justify-between items-center p-4">
                <div className="flex gap-4 items-center">
                    <img
                        className="w-[44px] h-[44px]"
                        alt="iconHeader"
                        src="/iconJadePortfolio.svg"></img>
                    <a
                        ref={backRef}
                        onClick={() => setActive("")}
                        className={`text-white hover:cursor-pointer ${
                            active ? "visible" : "invisible"
                        }`}>
                        {"< back"}
                    </a>
                </div>
                <div ref={linksRef} className="flex gap-4">
                    <a>Print</a>
                    <a>Branding</a>
                    <a>Photographie</a>
                    <a>Art</a>
                </div>
            </div>
            <Canvas camera={{ fov: 75, position: [0, 0, 5] }}>
                <ambientLight intensity={1}></ambientLight>
                <color attach="background" args={["#F2FFF4"]} />
                <ScrollControls damping={0.3} pages={2} enabled={true}>
                    <StaticScrollElements></StaticScrollElements>
                    <Scroll>
                        <ProjectPortal
                            name="01"
                            position={new THREE.Vector3(0, -1.5, 0)}
                            active={active}
                            title={"La Liste Rouge"}
                            date={"2023"}
                            setActive={setActive}></ProjectPortal>
                        <ProjectPortal
                            name="02"
                            position={new THREE.Vector3(0, -6, 0)}
                            active={active}
                            title={"Viri"}
                            date="2023"
                            setActive={setActive}></ProjectPortal>
                    </Scroll>
                    <Scroll html style={{ width: "100%" }}>
                        <div style={{ height: "200vh" }}>
                            {/* Contenu HTML ici */}
                        </div>
                    </Scroll>
                    <CameraMouv active={active}></CameraMouv>
                </ScrollControls>
                <Preload all></Preload>
            </Canvas>
        </div>
    );
}

function CameraMouv({ active }: { active: string }) {
    const { camera, scene } = useThree();
    console.log("scene", scene);
    const { el } = useScroll();

    useEffect(() => {
        const object = scene.getObjectByName(active);

        if (object && active !== "") {
            // gsap.to(camera.position, {
            //     x: 0,
            //     y: 0,
            //     z: 2,
            //     duration: 0.8,
            //     ease: "power3.inOut",
            // });
        } else {
            gsap.to(el, {
                scrollTop: 0,
                duration: 0.8,
                ease: "power3.inOut",
            });
            // gsap.to(camera.position, {
            //     x: 0,
            //     y: 0,
            //     z: 5,
            //     duration: 0.8,
            //     ease: "power3.inOut",
            // });
        }
    }, [active, camera, scene]);
    return <></>;
}

const ProjectPortal = ({
    active,
    setActive,
    position,
    date,
    title,
    name,
}: {
    active: string;
    setActive: Dispatch<SetStateAction<string>>;
    position: THREE.Vector3;
    title: string;
    date: string;
    name: string;
}) => {
    const [hover, setHover] = useState(false);
    const portalMaterialRef = useRef<any>(null);
    const planeRef = useRef<THREE.Mesh>(null);
    const [textures, setTextures] = useState<{ [key: string]: THREE.Texture }>(
        {}
    );
    const [textureSizes, setTextureSizes] = useState<{
        [key: string]: { width: number; height: number };
    }>({});

    useEffect(() => {
        const textureLoader = new THREE.TextureLoader();
        const textureUrls = {
            redLine: "/redLine1.png",
            redLine2: "/redLine2.png",
        };

        Object.entries(textureUrls).forEach(([key, url]) => {
            textureLoader.load(url, (loadedTexture) => {
                setTextures((prev) => ({
                    ...prev,
                    [key]: loadedTexture,
                }));
                // Calculer le ratio d'aspect de la texture
                const image = loadedTexture.image;
                const aspectRatio = image.width / image.height;
                setTextureSizes((prev) => ({
                    ...prev,
                    [key]: {
                        width: 1, // Largeur de base
                        height: 1 / aspectRatio, // Hauteur ajustée selon le ratio
                    },
                }));
            });
        });
    }, []);

    const handleActive = (name: string) => {
        if (active !== name) {
            setActive(name);
        }
    };

    useEffect(() => {
        if (active === name && portalMaterialRef.current) {
            gsap.to(portalMaterialRef.current, {
                blend: 1,
                duration: 0.3,
                delay: 0.1,
                ease: "power1.inOut",
            });
        } else if (portalMaterialRef.current) {
            gsap.to(portalMaterialRef.current, {
                blend: 0,
                duration: 0.3,
                delay: 0.1,
                ease: "power1.inOut",
            });
        }
    }, [active, name]);

    useEffect(() => {
        if (hover && planeRef.current) {
            gsap.to(planeRef.current.scale, {
                x: 1.2,
                y: 1.2,
                duration: 0.5,
                ease: "power3.inOut",
            });
        } else if (planeRef.current) {
            gsap.to(planeRef.current.scale, {
                x: 1,
                y: 1,
                duration: 0.5,
                ease: "power3.inOut",
            });
        }
    }, [hover]);

    return (
        <group>
            <Text
                font="/MinionPro-Bold.otf"
                fontSize={0.4}
                color={"#F0F0F0"}
                position={[position.x - 2.65, position.y + 1.7, 0.01]}
                material-toneMapped={false}
                anchorY="top"
                anchorX="left">
                {title}
            </Text>
            <Text
                font="/MinionPro-Bold.otf"
                fontSize={0.2}
                color={"#F0F0F0"}
                lineHeight={0.8}
                position={[position.x - 2.25, position.y + 1.2, 0.01]}
                material-toneMapped={false}
                anchorY="top"
                anchorX="right">
                {date}
            </Text>
            <mesh
                name={name}
                ref={planeRef}
                position={position}
                onPointerEnter={() => setHover(true)}
                onPointerLeave={() => setHover(false)}
                onDoubleClick={(e) => (
                    e.stopPropagation(), handleActive(name)
                )}>
                <planeGeometry args={[6, 4]} />
                <MeshPortalMaterial
                    ref={portalMaterialRef}
                    side={2}
                    resolution={512}
                    blur={0}>
                    <color attach="background" args={["#000000"]} />
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[5, 5, 5]} intensity={1} />
                    <mesh position={[0, 0, 0]}>
                        <planeGeometry
                            args={[
                                textureSizes.redLine?.width || 1,
                                textureSizes.redLine?.height || 1,
                            ]}
                        />
                        <meshStandardMaterial map={textures.redLine} />
                    </mesh>
                    <mesh position={[2, -1, -5]}>
                        <planeGeometry
                            args={[
                                textureSizes.redLine2?.width || 1,
                                textureSizes.redLine2?.height || 1,
                            ]}
                        />
                        <meshStandardMaterial map={textures.redLine2} />
                    </mesh>
                </MeshPortalMaterial>
            </mesh>
        </group>
    );
};

const StaticScrollElements = () => {
    const scroll = useScroll();
    const titleRef = useRef<THREE.Mesh>(null);
    const tl = useRef(gsap.timeline());

    useLayoutEffect(() => {
        if (titleRef.current)
            tl.current
                .to(
                    titleRef.current.position,
                    {
                        z: -6,
                        duration: 1,
                        ease: "power3.inOut",
                    },
                    0
                )
                .to(
                    titleRef.current.material,
                    {
                        opacity: 0,
                        duration: 1,
                        ease: "power3.inOut",
                    },
                    0
                );
    }, []);

    useFrame(() => {
        tl.current.seek(scroll.offset * tl.current.duration());
    });
    return (
        <Text
            ref={titleRef}
            position={[-5, 3, -3]}
            color={"#000000"}
            fontSize={2}>
            Print
        </Text>
    );
};

export default App;
