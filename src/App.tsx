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
    CameraControls,
} from "@react-three/drei";
// import { Slider } from "./components/ui/slider";
// import { useProgress } from "@react-three/drei";
import gsap from "gsap";
import * as THREE from "three";

type PrintType = {
    title: string;
    date: string;
    position: THREE.Vector3;
    arts: {
        position: THREE.Vector3;
        texture: string;
        loadedTexture?: THREE.Texture;
        planeSize?: {
            width: number;
            height: number;
        };
    }[];
};

function App() {
    const [value, setValue] = useState(0);
    const [duration, setDuration] = useState(0);
    const [active, setActive] = useState("");
    const prints: PrintType[] = [
        {
            title: "La liste Rouge",
            date: "2023",
            position: new THREE.Vector3(0, -1.5, 0),
            arts: [
                {
                    position: new THREE.Vector3(0, 0, 0),
                    texture: "/redLine1.png",
                },
                {
                    position: new THREE.Vector3(2, -1, -5),
                    texture: "/redLine2.png",
                },
            ],
        },
        {
            title: "Viri",
            date: "2023",
            position: new THREE.Vector3(0, -6, 0),
            arts: [
                {
                    position: new THREE.Vector3(0, 0, 0),
                    texture: "/Viri1.png",
                },
                {
                    position: new THREE.Vector3(2, -1, -5),
                    texture: "/Viri2.png",
                },
                {
                    position: new THREE.Vector3(2, -1, -5),
                    texture: "/Viri3.png",
                },
                {
                    position: new THREE.Vector3(2, -1, -5),
                    texture: "/Viri4.png",
                },
                {
                    position: new THREE.Vector3(2, -1, -5),
                    texture: "/Viri5.png",
                },
                {
                    position: new THREE.Vector3(2, -1, -5),
                    texture: "/Viri6.png",
                },

                {
                    position: new THREE.Vector3(2, -1, -5),
                    texture: "/Viri7.png",
                },
                {
                    position: new THREE.Vector3(2, -1, -5),
                    texture: "/Viri8.png",
                },
                {
                    position: new THREE.Vector3(2, -1, -5),
                    texture: "/Viri9.png",
                },
                {
                    position: new THREE.Vector3(2, -1, -5),
                    texture: "/Viri10.png",
                },
            ],
        },
    ];
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
    }, [active]);

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
                <div ref={linksRef} className="flex gap-4 mr-4">
                    <a className="hover:text-accent hover:cursor-pointer">
                        Print
                    </a>
                    <a className="hover:text-accent hover:cursor-pointer">
                        Branding
                    </a>
                    <a className="hover:text-accent hover:cursor-pointer">
                        Photographie
                    </a>
                    <a className="hover:text-accent hover:cursor-pointer">
                        Art
                    </a>
                </div>
            </div>
            <Canvas camera={{ fov: 75, position: [0, 0, 5] }}>
                <ambientLight intensity={1}></ambientLight>
                <color attach="background" args={["#F2FFF4"]} />
                {prints.map((print: PrintType) => (
                    <ProjectPortal
                        active={active}
                        infos={print}
                        setActive={setActive}></ProjectPortal>
                ))}
                {/* <ScrollControls damping={0.3} pages={2} enabled={true}>
                    <StaticScrollElements></StaticScrollElements>
                    <Scroll> 
                        {prints.map((print: PrintType) => (
                            <ProjectPortal
                                active={active}
                                infos={print}
                                setActive={setActive}></ProjectPortal>
                        ))}
                     </Scroll> 
                    <Scroll html style={{ width: "100%" }}>
                        <div style={{ height: "200vh" }}>
                             Contenu HTML ici 
                        </div>
                    </Scroll> 
                 </ScrollControls>*/}
                {/* <CameraMouv active={active}></CameraMouv> */}
                <Preload all></Preload>
            </Canvas>
        </div>
    );
}

function CameraMouv({ active }: { active: string }) {
    const { scene } = useThree();
    // const { el } = useScroll();
    const object = scene.getObjectByName(active);
    const currentObject = object;

    useEffect(() => {
        if (object?.type !== "Scene") {
            if (object)
                gsap.to(object.position, {
                    z: 2,
                    duration: 0.8,
                    ease: "power3.inOut",
                });
        } else {
            // gsap.to(el, {
            //     scrollTop: 0,
            //     duration: 0.8,
            //     ease: "power3.inOut",
            // });
            // if (object)
            //     gsap.to(object.position, {
            //         z: 0,
            //         duration: 0.8,
            //         ease: "power3.inOut",
            //     });
        }
    }, [active, object]);
    return <></>;
}

const ProjectPortal = ({
    active,
    setActive,
    infos,
}: {
    active: string;
    setActive: Dispatch<SetStateAction<string>>;
    infos: PrintType;
}) => {
    const [hover, setHover] = useState(false);
    const portalMaterialRef = useRef<any>(null);
    const planeRef = useRef<THREE.Mesh>(null);
    const [textures, setTextures] = useState<
        {
            loadedTexture: THREE.Texture;
            planeSize: { width: number; height: number };
            position: THREE.Vector3;
        }[]
    >([]);
    const [texturesLoaded, setTexturesLoaded] = useState(false);
    const { invalidate } = useThree();

    useEffect(() => {
        const textureLoader = new THREE.TextureLoader();

        let loadedCount = 0;
        const totalTextures = Object.keys(infos.arts).length;

        infos.arts.forEach((art) => {
            textureLoader.load(
                art.texture,
                (loadedTexture) => {
                    loadedTexture.needsUpdate = true;
                    const image = loadedTexture.image;
                    const aspectRatio = image.width / image.height;
                    const temp = {
                        loadedTexture,
                        planeSize: { width: 1, height: 1 / aspectRatio },
                        position: art.position,
                    };
                    setTextures((prev) => [...prev, temp]);

                    loadedCount++;
                    if (loadedCount === totalTextures) {
                        setTexturesLoaded(true);
                        invalidate(); // Force le rendu à se mettre à jour
                    }
                },
                undefined,
                (error) => {
                    console.error(
                        `Erreur de chargement de la texture ${art.texture}:`,
                        error
                    );
                }
            );
        });
    }, [invalidate]);

    const handleActive = (name: string) => {
        if (active !== name) {
            setActive(name);
        }
    };

    useEffect(() => {
        console.log("blend");
        if (active === infos.title) {
            if (portalMaterialRef.current && planeRef.current) {
                gsap.to(portalMaterialRef.current, {
                    blend: 1,
                    duration: 0.3,
                    delay: 0.1,
                    ease: "power1.inOut",
                });
                gsap.to(planeRef.current.position, {
                    z: 3,
                    duration: 0.3,
                    delay: 0.1,
                    ease: "power1.inOut",
                });
            }
        } else {
            if (portalMaterialRef.current && planeRef.current) {
                gsap.to(portalMaterialRef.current, {
                    blend: 0,
                    duration: 0.3,
                    delay: 0.1,
                    ease: "power1.inOut",
                });
                // gsap.to(planeRef.current.position, {
                //     z: 0,
                //     duration: 0.3,
                //     delay: 0.1,
                //     ease: "power1.inOut",
                // });
            }
        }
    }, [active, infos.title]);

    useEffect(() => {
        // if (hover && planeRef.current) {
        //     gsap.to(planeRef.current.scale, {
        //         x: 1.2,
        //         y: 1.2,
        //         duration: 0.5,
        //         ease: "power3.inOut",
        //     });
        // } else if (planeRef.current) {
        //     gsap.to(planeRef.current.scale, {
        //         x: 1,
        //         y: 1,
        //         duration: 0.5,
        //         ease: "power3.inOut",
        //     });
        // }
    }, [hover]);

    return (
        <group>
            <Text
                font="/MinionPro-Bold.otf"
                fontSize={0.4}
                color={"#F0F0F0"}
                position={[
                    infos.position.x - 2.65,
                    infos.position.y + 1.7,
                    0.1,
                ]}
                material-toneMapped={false}
                anchorY="top"
                anchorX="left">
                {infos.title}
            </Text>
            <Text
                font="/MinionPro-Bold.otf"
                fontSize={0.2}
                color={"#F0F0F0"}
                lineHeight={0.8}
                position={[
                    infos.position.x - 2.65,
                    infos.position.y + 1.2,
                    0.1,
                ]}
                material-toneMapped={false}
                anchorY="top"
                anchorX="left">
                {infos.date}
            </Text>
            <mesh
                name={infos.title}
                ref={planeRef}
                position={infos.position}
                onPointerEnter={() => setHover(true)}
                onPointerLeave={() => setHover(false)}
                onDoubleClick={(e) => (
                    e.stopPropagation(), handleActive(infos.title)
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
                    {textures &&
                        texturesLoaded &&
                        textures.map((texture, idx) => (
                            <mesh
                                key={`${idx}_texture`}
                                position={texture.position}
                                scale={1.5}>
                                <planeGeometry
                                    args={[
                                        texture.planeSize?.width || 1,
                                        texture.planeSize?.height || 1,
                                    ]}
                                />
                                <meshStandardMaterial
                                    map={texture.loadedTexture}
                                    needsUpdate={true}
                                />
                            </mesh>
                        ))}
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
                        duration: 0.5,
                        ease: "power1.inOut",
                    },
                    0
                )
                .to(
                    titleRef.current.material,
                    {
                        opacity: 0,
                        duration: 0.2,
                        ease: "power1.inOut",
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
