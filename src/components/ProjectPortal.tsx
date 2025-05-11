import { useRef, useState, useMemo, useEffect, Suspense } from "react";
import { PrintType } from "@/Print";
import { useScroll, MeshPortalMaterial, Text } from "@react-three/drei";
import { invalidate, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { useTransitionStore } from "@/stores/useTransitionStore";

export default function ProjectPortal({
    idx,
    print,
    printslength,
}: {
    idx: number;
    print: PrintType;
    printslength: number;
}) {
    const groupObject = useRef<THREE.Group>(null);
    const meshPortalRef = useRef<any>(null);
    const portalRef = useRef<THREE.Mesh>(null);
    const lastScroll = useRef(0);
    const scroll = useScroll();
    const { activePortal, setPortalActive, setHover } = useTransitionStore(
        (s) => s
    );
    const [textures, setTextures] = useState<
        {
            name: string;
            loadedTexture: THREE.Texture;
            planeSize: { width: number; height: number };
            position: THREE.Vector3;
        }[]
    >([]);
    const [texturesLoaded, setTexturesLoaded] = useState(false);
    const position = useMemo(
        () => new THREE.Vector3(0, -2 - idx * 4.5, 0),
        [idx]
    );
    const tl = useRef(gsap.timeline());
    const meshRefs = useRef<Array<THREE.Mesh | null>>([]);
    const font = useMemo(() => "/MinionPro-Bold.otf", []);

    useEffect(() => {
        tl.current = gsap.timeline({ paused: true });
        if (portalRef.current) {
            tl.current
                .to(
                    portalRef.current.position,
                    {
                        duration: 1,
                        y: 0,
                        ease: "power3.inOut",
                    },
                    idx
                )
                .to(
                    portalRef.current.scale,
                    {
                        duration: 1.1,
                        x: 1.5,
                        y: 1.5,
                        ease: "power3.inOut",
                    },
                    idx
                );
            if (idx !== printslength - 1) {
                tl.current
                    .to(
                        portalRef.current.position,
                        {
                            duration: 1,
                            y: 7,
                            ease: "power3.inOut",
                        },
                        idx + 1
                    )
                    .to(
                        portalRef.current.scale,
                        {
                            duration: 1,
                            x: 1,
                            y: 1,
                            ease: "power3.inOut",
                        },
                        idx + 1.1
                    )
                    .to(
                        portalRef.current.position,
                        {
                            duration: printslength - idx - 1.9,
                            y: 7,
                            ease: "power3.inOut",
                        },
                        idx + 2
                    );
            }
        }
    }, [idx, printslength]);

    useFrame(() => {
        console.log("offset", scroll.offset);
        if (tl.current && tl.current.duration() > 0 && activePortal === "") {
            tl.current.seek(scroll.offset * tl.current.duration());
        }
    });

    useEffect(() => {
        const textureLoader = new THREE.TextureLoader();
        let loadedCount = 0;
        const totalTextures = Object.keys(print.arts).length;

        const asyncTextureLoading = async () => {
            for (let i = 0; i < print.arts.length; i++) {
                const promise = new Promise((resolve, reject) => {
                    textureLoader.load(
                        print.arts[i].texture,
                        (loadedTexture) => {
                            loadedTexture.needsUpdate = true;
                            const image = loadedTexture.image;
                            const aspectRatio = image.width / image.height;
                            const newPosition = new THREE.Vector3(
                                0 + i * 2,
                                0,
                                0
                            );
                            const temp = {
                                name: print.arts[i].texture,
                                loadedTexture,
                                planeSize: {
                                    width: 1,
                                    height: 1 / aspectRatio,
                                },
                                position: newPosition,
                            };
                            setTextures((prev) => [...prev, temp]);
                            loadedCount++;
                            if (loadedCount === totalTextures) {
                                setTexturesLoaded(true);
                                invalidate(); // Force le rendu à se mettre à jour
                            }
                            resolve(loadedTexture);
                        },
                        undefined,
                        (error) => {
                            console.error(
                                `Erreur de chargement de la texture ${print.arts[i].texture}:`,
                                error
                            );
                            reject(error);
                        }
                    );
                });
                await promise;
            }
        };
        asyncTextureLoading();
    }, [print.arts]);

    useEffect(() => {
        if (meshPortalRef.current && portalRef.current && groupObject.current) {
            if (activePortal === print.title) {
                lastScroll.current = scroll.offset;
                gsap.to(meshPortalRef.current, {
                    blend: 1,
                    delay: 0.5,
                    duration: 0.3,
                    ease: "power1.inOut",
                });
                gsap.to(portalRef.current.position, {
                    z: 3,
                    duration: 0.8,
                    ease: "power3.inOut",
                });
                // gsap.to(groupObject.current.position, {
                //     z: -1,
                //     duration: 0.8,
                //     ease: "power3.inOut",
                // });
            } else {
                gsap.to(meshPortalRef.current, {
                    blend: 0,
                    delay: 0.5,
                    duration: 0.3,
                    ease: "power1.inOut",
                });
                gsap.to(portalRef.current.position, {
                    z: 0,
                    delay: 0.5,
                    duration: 0.8,
                    ease: "power3.inOut",
                });
                // gsap.to(groupObject.current.position, {
                //     z: 3,
                //     duration: 0.8,
                //     delay: 0.8,
                //     ease: "power3.inOut",
                // });
                // gsap.to(scroll.el, {
                //     scrollTop: lastScroll.current,
                //     duration: 0.8,
                //     ease: "power3.inOut",
                // });
            }
        }
        if (activePortal !== "") {
            setHover(false);
        }
    }, [activePortal, setHover, print.title, scroll.offset, scroll.el]);

    return (
        <group
            position={position}
            ref={portalRef}
            onPointerEnter={() =>
                !activePortal ? setHover(true) : setHover(false)
            }
            onPointerLeave={() => setHover(false)}>
            <Suspense fallback={null}>
                <Text
                    font={font}
                    fontSize={0.2}
                    color={"#000"}
                    lineHeight={0.8}
                    material-toneMapped={false}
                    anchorY="top"
                    anchorX="left"
                    position={[-2.95, -2.1, 0.1]}>
                    {print.title}
                </Text>
            </Suspense>
            <mesh onDoubleClick={() => setPortalActive(print.title)}>
                <planeGeometry args={[6, 4]}></planeGeometry>
                <MeshPortalMaterial
                    ref={meshPortalRef}
                    blend={0}
                    resolution={0}
                    blur={0}
                    side={2}>
                    <color attach={"background"} args={["#000000"]}></color>
                    <fog attach={"fog"} args={["#000000", 7, 25]}></fog>
                    <group ref={groupObject}>
                        {texturesLoaded &&
                            textures.map((texture, i) => (
                                <mesh
                                    key={`pages-${i}`}
                                    scale={
                                        texture.planeSize.height >
                                        texture.planeSize.width
                                            ? 0.7
                                            : 1.43
                                    }
                                    ref={(el) => (meshRefs.current[i] = el)}
                                    name={texture.name}
                                    position={texture.position}>
                                    <planeGeometry
                                        args={[
                                            texture.planeSize.width,
                                            texture.planeSize.height,
                                        ]}></planeGeometry>
                                    <meshBasicMaterial
                                        side={2}
                                        //color={new THREE.Color("red")}
                                        map={texture.loadedTexture}
                                        transparent={false}
                                    />
                                </mesh>
                            ))}
                    </group>
                </MeshPortalMaterial>
            </mesh>
        </group>
    );
}
