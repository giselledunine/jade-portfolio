import {
    Dispatch,
    SetStateAction,
    useRef,
    useState,
    useMemo,
    useEffect,
} from "react";
import { PrintType } from "@/Print";
import { useScroll, MeshPortalMaterial, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";

export default function ProjectPortal({
    idx,
    active,
    setActive,
    print,
    printslength,
}: {
    idx: number;
    active: string;
    setActive: Dispatch<SetStateAction<string>>;
    print: PrintType;
    printslength: number;
}) {
    const groupObject = useRef<THREE.Group>(null);
    const meshPortalRef = useRef<any>(null);
    const portalRef = useRef<THREE.Mesh>(null);
    const scroll = useScroll();
    // const { scene } = useThree();
    // const lastScroll = useRef(0);
    const [hover, setHover] = useState(false);
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

    useEffect(() => {
        tl.current = gsap.timeline({ paused: true });
        if (portalRef.current)
            tl.current
                .to(
                    portalRef.current.position,
                    {
                        duration: 1,
                        y: 0,
                        ease: "power3.inOut",
                    },
                    idx - 0.1
                )
                .to(
                    portalRef.current.scale,
                    {
                        duration: 1.5,
                        x: 1.5,
                        y: 1.5,
                        ease: "power3.inOut",
                    },
                    idx
                );

        if (idx !== printslength - 1 && portalRef.current) {
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
                        ease: "power3.out",
                    },
                    idx + 1.5
                )
                .to(
                    portalRef.current.position,
                    {
                        duration: printslength - idx,
                        y: 7,
                        ease: "power3.out",
                    },
                    idx + 2.5
                );
        } else {
            if (portalRef.current)
                tl.current.to(
                    portalRef.current.position,
                    {
                        duration: printslength - idx + 1,
                        y: 0,
                        ease: "power3.out",
                    },
                    idx + 1.5
                );
        }
        //     // Attendre que le portail soit ouvert
        if (active === print.title) {
            // Petit délai pour s'assurer que les meshes sont chargés
            textures.forEach((texture, i) => {
                const mesh = meshRefs.current[i];
                if (mesh) {
                    tl.current
                        .to(
                            mesh.position,
                            {
                                z: 0,
                                x: 0,
                                y: 0,
                                duration: 1,
                                ease: "power2.out",
                            },
                            i
                        )
                        .to(
                            mesh.position,
                            {
                                y:
                                    texture.position.y === 0
                                        ? texture.position.y + 2
                                        : texture.position.y,
                                duration: 1,
                                ease: "power2.out",
                            },
                            i + 1
                        );
                }
            });
        }
    }, [idx, print.title]);

    useFrame(() => {
        if (tl.current && tl.current.duration() > 0 && active === "") {
            tl.current.seek(scroll.offset * tl.current.duration());
        }
    });

    useEffect(() => {
        if (hover) {
            // if (portalRef.current) {
            //     gsap.to(portalRef.current.scale, {
            //         x: 1.2,
            //         y: 1.2,
            //         duation: 0.8,
            //         ease: "power3.inOut",
            //     });
            // }
        } else {
            // if (portalRef.current) {
            //     gsap.to(portalRef.current.scale, {
            //         x: 1,
            //         y: 1,
            //         duation: 0.8,
            //         ease: "power3.inOut",
            //     });
            // }
        }
    }, [hover, active]);

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
                                //(Math.random() * 2 - 1) * i * 0.5,
                                //(Math.random() * 2 - 1) * i * 0.5,
                                0 + i * 0.2,
                                0,
                                -i * 0.2
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
                                //invalidate(); // Force le rendu à se mettre à jour
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
        if (
            active === print.title &&
            meshPortalRef.current &&
            portalRef.current &&
            groupObject.current
        ) {
            //lastScroll.current = scroll.offset * scroll.el.scrollHeight;
            meshRefs.current.forEach((ref) => {
                if (ref?.position) {
                    gsap.to(ref.position, {
                        x:
                            ref.position.x === 0
                                ? ref.position.x
                                : ref.position.x * 2,
                        y:
                            ref.position.y === 0
                                ? ref.position.y
                                : ref.position.y * 2,
                        duration: 0.8,
                        ease: "power3.inOut",
                    });
                }
            });

            gsap.to(meshPortalRef.current, {
                blend: 1,
                delay: 0.5,
                duration: 0.3,
                ease: "power1.inOut",
            });
            gsap.to(portalRef.current.position, {
                z: 4,
                duration: 0.8,
                ease: "power3.inOut",
            });
            gsap.to(groupObject.current.position, {
                z: 0,
                duration: 0.8,
                ease: "power3.inOut",
            });
        } else if (active === "" && portalRef.current && groupObject.current) {
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
            gsap.to(groupObject.current.position, {
                z: 2,
                duration: 0.8,
                delay: 0.8,
                ease: "power3.inOut",
            });
            // gsap.to(scroll.el, {
            //     scrollTop: lastScroll.current,
            //     duration: 0.8,
            //     ease: "power3.inOut",
            // });
        }
    }, [active, print.title, scroll.offset, scroll.el]);

    return (
        <group
            position={position}
            ref={portalRef}
            onPointerEnter={() => setHover(true)}
            onPointerLeave={() => setHover(false)}>
            <Text
                font="/MinionPro-Bold.otf"
                fontSize={0.2}
                color={"#000"}
                lineHeight={0.8}
                material-toneMapped={false}
                anchorY="top"
                anchorX="left"
                position={[-2.95, -2.1, 0.1]}>
                {print.title}
            </Text>
            <mesh onDoubleClick={() => setActive(print.title)}>
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
                            textures &&
                            textures.map((texture, i) => (
                                <mesh
                                    key={`pages-${i}`}
                                    scale={0.7}
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
