import {
    Dispatch,
    SetStateAction,
    useRef,
    useState,
    useMemo,
    useLayoutEffect,
    useEffect,
} from "react";
import { PrintType } from "@/Test";
import { useScroll, MeshPortalMaterial, Text } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";

export default function ProjectPortal({
    idx,
    active,
    setActive,
    print,
}: {
    idx: number;
    active: string;
    setActive: Dispatch<SetStateAction<string>>;
    print: PrintType;
}) {
    const groupObject = useRef<THREE.Group>(null);
    const meshPortalRef = useRef<any>(null);
    const portalRef = useRef<THREE.Mesh>(null);
    const scroll = useScroll();
    const { scene } = useThree();
    const lastScroll = useRef(0);
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

    useLayoutEffect(() => {
        tl.current = gsap.timeline({ paused: true });

        // Attendre que le portail soit ouvert
        if (active === print.title) {
            // Petit délai pour s'assurer que les meshes sont chargés

            textures.forEach((texture, i) => {
                const mesh = meshRefs.current[i];
                console.log("mesh", mesh);
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
                                z:
                                    texture.position.z === 0
                                        ? texture.position.z + 1
                                        : texture.position.z,
                                x:
                                    texture.position.x === 0
                                        ? texture.position.x + 1
                                        : texture.position.x,
                                y:
                                    texture.position.y === 0
                                        ? texture.position.y + 1
                                        : texture.position.y,
                                duration: 1,
                                ease: "power2.out",
                            },
                            i + 1
                        );
                }
            });
            console.log("tlplay");
            //tl.current.play();
        } else if (active === "") {
            // Arrêter l'animation des meshes
            console.log("tlpause");
            tl.current.pause();
        }
    }, [textures, scene, active, print.title]);

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
                                (Math.random() * 2 - 1) * i * 0.5,
                                (Math.random() * 2 - 1) * i * 0.5,
                                -i
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
                            console.log("temp", print.arts[i]);
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
            lastScroll.current = scroll.offset * scroll.el.scrollHeight;
            // meshRefs.current.forEach((ref) => {
            //     if (ref?.position) {
            //         gsap.to(ref.position, {
            //             x:
            //                 ref.position.x === 0
            //                     ? ref.position.x
            //                     : ref.position.x * 2,
            //             y:
            //                 ref.position.y === 0
            //                     ? ref.position.y
            //                     : ref.position.y * 2,
            //             duration: 0.8,
            //             ease: "power3.inOut",
            //         });
            //     }
            // });

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

            tl.current.play();
        } else if (active === "" && portalRef.current && groupObject.current) {
            gsap.to(meshPortalRef.current, {
                blend: 0,
                delay: 0.5,
                duration: 0.3,
                ease: "power1.inOut",
            });
            gsap.to(portalRef.current.position, {
                z: 1,
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
            gsap.to(scroll.el, {
                scrollTop: lastScroll.current,
                duration: 0.8,
                ease: "power3.inOut",
            });
            tl.current.pause();
        }
    }, [active, print.title, scroll.offset, scroll.el]);

    return (
        <group ref={portalRef}>
            <Text
                font="/MinionPro-Bold.otf"
                fontSize={0.3}
                color={"#F0F0F0"}
                lineHeight={0.8}
                material-toneMapped={false}
                anchorY="top"
                anchorX="left"
                position={[
                    position.x - 2.35,
                    position.y + 1.45,
                    position.z + 0.1,
                ]}>
                {print.title}
            </Text>
            <Text
                font="/MinionPro-Bold.otf"
                fontSize={0.15}
                color={"#F0F0F0"}
                lineHeight={0.8}
                material-toneMapped={false}
                anchorY="top"
                anchorX="left"
                position={[
                    position.x - 2.35,
                    position.y + 1.15,
                    position.z + 0.1,
                ]}>
                {print.date}
            </Text>
            <mesh
                position={position}
                onDoubleClick={() => setActive(print.title)}>
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
                                        map={texture.loadedTexture}
                                    />
                                </mesh>
                            ))}
                    </group>
                </MeshPortalMaterial>
            </mesh>
        </group>
    );
}
