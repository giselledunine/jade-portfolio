import { Text, useScroll } from "@react-three/drei";
import {
    Suspense,
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import * as THREE from "three";
import { useTransitionStore } from "./stores/useTransitionStore";
import gsap from "gsap";
import { useFrame } from "@react-three/fiber";

type Project = {
    texture: string;
};

type LoadedTextureType = {
    texture: THREE.Texture;
    planeSize: {
        width: number;
        height: number;
    };
};

export default function Photographie() {
    const titleRef = useRef<Text>(null);
    const scroll = useScroll();
    const projects: Project[] = useMemo(
        () => [
            { texture: "/image1.png" },
            { texture: "/image2.png" },
            { texture: "/image3.png" },
            { texture: "/image4.png" },
            { texture: "/image5.png" },
        ],
        []
    );
    const [loadedTextures, setLoadedTextures] = useState<LoadedTextureType[]>(
        []
    );
    const { setHover } = useTransitionStore((s) => s);
    const meshRefs = useRef<Array<THREE.Mesh | null>>([]);
    const groupRef = useRef<THREE.Group>(null);
    const tl = useRef(gsap.timeline());

    useEffect(() => {
        const textureLoader = new THREE.TextureLoader();

        const asyncTextureLoading = () => {
            projects.map((project) => {
                textureLoader.load(project.texture, (loadedTexture) => {
                    const image = loadedTexture.image;
                    const aspectRatio = image.width / image.height;
                    const temp: LoadedTextureType = {
                        texture: loadedTexture,
                        planeSize: {
                            width: 1,
                            height: 1 / aspectRatio,
                        },
                    };
                    setLoadedTextures((prev) => [...prev, temp]);
                });
            });
        };
        asyncTextureLoading();
    }, [projects]);

    const setScaleUp = (hoverIdx: number) => {
        if (meshRefs.current[hoverIdx]) {
            gsap.to(meshRefs.current[hoverIdx].scale, {
                x: 3,
                y: 3,
                duration: 0.5,
                ease: "power3.inOut",
            });
            gsap.to(meshRefs.current[hoverIdx].position, {
                z: 0.5,
                y: -1.35,
                x: -3.5 + hoverIdx * 2.1 + 0.5,
                duration: 0.5,
                ease: "power3.inOut",
            });
            meshRefs.current.forEach((meshRef, idx) => {
                if (idx > hoverIdx) {
                    if (meshRef) {
                        gsap.to(meshRef.position, {
                            x: -3.5 + idx * 2.1 + 1,
                            duration: 0.5,
                            ease: "power3.inOut",
                        });
                    }
                }
            });
        }
    };

    const setScaleDown = (hoverIdx: number) => {
        if (meshRefs.current[hoverIdx]) {
            gsap.to(meshRefs.current[hoverIdx].scale, {
                x: 2,
                y: 2,
                duration: 0.5,
                ease: "power3.inOut",
            });
            gsap.to(meshRefs.current[hoverIdx].position, {
                z: 0,
                y: -2,
                x: -3.5 + hoverIdx * 2.1,
                duration: 0.5,
                ease: "power3.inOut",
            });
            meshRefs.current.forEach((meshRef, idx) => {
                if (idx > hoverIdx) {
                    if (meshRef) {
                        gsap.to(meshRef.position, {
                            x: -3.5 + idx * 2.1,
                            duration: 0.5,
                            ease: "power3.inOut",
                        });
                    }
                }
            });
        }
    };

    useLayoutEffect(() => {
        tl.current = gsap.timeline({ paused: true });
        if (groupRef.current) {
            tl.current.to(
                groupRef.current.position,
                {
                    x: -5,
                    ease: "power1.in",
                },
                0
            );
        }
    }, []);

    useFrame(() => {
        if (tl.current) {
            tl.current.seek(scroll.offset * tl.current.duration());
        }
    });

    return (
        <>
            <Suspense>
                <Text
                    ref={titleRef}
                    font="/Helvetica.ttf"
                    color={"#000000"}
                    fontSize={1}
                    position={[0, 2, 0]}>
                    Photographie
                </Text>
            </Suspense>
            <group ref={groupRef}>
                {loadedTextures.map((loadedTexture, idx) => (
                    <mesh
                        ref={(el) => (meshRefs.current[idx] = el)}
                        key={idx}
                        scale={2}
                        position={[-3.5 + idx * 2.1, -2, 0]}
                        onPointerEnter={() => {
                            setScaleUp(idx);
                            setHover(true);
                        }}
                        onPointerLeave={() => {
                            setScaleDown(idx);
                            setHover(false);
                        }}>
                        <planeGeometry
                            args={[
                                loadedTexture.planeSize.width,
                                loadedTexture.planeSize.height,
                            ]}></planeGeometry>
                        <meshBasicMaterial
                            map={loadedTexture.texture}></meshBasicMaterial>
                    </mesh>
                ))}
            </group>
        </>
    );
}
