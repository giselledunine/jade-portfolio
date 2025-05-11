import { useScroll, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import "./App.css";
import * as THREE from "three";
import { Suspense, useLayoutEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import ProjectPortal from "./components/ProjectPortal";

export type PrintType = {
    title: string;
    date: string;
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

export default function Print() {
    const prints: PrintType[] = useMemo(
        () => [
            {
                title: "La liste Rouge",
                date: "2023",
                arts: [
                    {
                        position: new THREE.Vector3(0, 0, 0),
                        texture: "/redLine1.png",
                    },
                    {
                        position: new THREE.Vector3(2, -1, -5),
                        texture: "/redLine2.png",
                    },
                    {
                        position: new THREE.Vector3(2, -1, -5),
                        texture: "/redLine3.png",
                    },
                    {
                        position: new THREE.Vector3(2, -1, -5),
                        texture: "/redLine4.png",
                    },
                ],
            },
            {
                title: "Viri",
                date: "2023",
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
            {
                title: "Mémoire",
                date: "2023",
                arts: [
                    {
                        position: new THREE.Vector3(0, 0, 0),
                        texture: "/Memoire1.png",
                    },
                    {
                        position: new THREE.Vector3(2, -1, -5),
                        texture: "/Memoire2.png",
                    },
                    {
                        position: new THREE.Vector3(2, -1, -5),
                        texture: "/Memoire3.png",
                    },
                    {
                        position: new THREE.Vector3(2, -1, -5),
                        texture: "/Memoire4.png",
                    },
                ],
            },
            {
                title: "Composite",
                date: "2023",
                arts: [
                    {
                        position: new THREE.Vector3(0, 0, 0),
                        texture: "/Composite1.png",
                    },
                    {
                        position: new THREE.Vector3(2, -1, -5),
                        texture: "/Composite2.png",
                    },
                    {
                        position: new THREE.Vector3(2, -1, -5),
                        texture: "/Composite3.png",
                    },
                    {
                        position: new THREE.Vector3(2, -1, -5),
                        texture: "/Composite4.png",
                    },
                    {
                        position: new THREE.Vector3(2, -1, -5),
                        texture: "/Composite5.png",
                    },
                    {
                        position: new THREE.Vector3(2, -1, -5),
                        texture: "/Composite6.png",
                    },
                ],
            },
        ],
        []
    );

    return <StaticScrollElements prints={prints}></StaticScrollElements>;
}

const StaticScrollElements = ({ prints }: { prints: PrintType[] }) => {
    const scroll = useScroll();
    const titleRef = useRef<THREE.Mesh>(null);
    const tl = useRef(gsap.timeline({ paused: true }));
    const starRef = useRef<THREE.Mesh>(null);

    //maybe add the portals here so they don't scroll and animate the mouvement with the tl

    useFrame(() => {
        tl.current.seek(scroll.offset * tl.current.duration());
    });

    useLayoutEffect(() => {
        tl.current = gsap.timeline({ paused: true });
        function randomBetween4And6OrMinus4AndMinus6() {
            const isNegative = Math.random() < 0.5; // 50% de chance que ce soit négatif
            const value = 2 + Math.random() * 4; // nombre entre 4 et 8

            return isNegative ? -value : value;
        }
        prints.forEach((_, idx) => {
            const randomScale = randomBetween4And6OrMinus4AndMinus6();
            if (starRef.current)
                tl.current
                    .to(
                        starRef.current.position,
                        {
                            x: randomBetween4And6OrMinus4AndMinus6(),
                            y: randomBetween4And6OrMinus4AndMinus6(),
                            duration: 1,
                            ease: "power3.inOut",
                        },
                        idx
                    )
                    .to(
                        starRef.current.scale,
                        {
                            x: randomScale,
                            y: randomScale,
                            duration: 1,
                            ease: "power3.inOut",
                        },
                        idx
                    );
        });

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
    }, [prints]);

    const textureLoader = new THREE.TextureLoader();
    const starTexture = textureLoader.load("/star.png");

    return (
        <group>
            <Suspense>
                <Text
                    ref={titleRef}
                    font="/Helvetica.ttf"
                    position={[-5, 3, -3]}
                    color={"#000000"}
                    fontSize={2}>
                    Print
                </Text>
            </Suspense>
            <mesh ref={starRef} position={[3, 2.2, -1]}>
                <planeGeometry args={[1, 1]}></planeGeometry>
                <meshBasicMaterial
                    map={starTexture}
                    transparent={true}></meshBasicMaterial>
            </mesh>
            {prints.map((print, idx) => (
                <ProjectPortal
                    printslength={prints.length}
                    key={`portal-${idx}`}
                    print={print}
                    idx={idx}></ProjectPortal>
            ))}
        </group>
    );
};
