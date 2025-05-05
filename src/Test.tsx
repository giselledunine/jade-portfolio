import { Scroll, ScrollControls, useScroll, Text } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import "./App.css";
import * as THREE from "three";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import LoadingAnimation from "./components/LoadingAnimation";
import Header from "./components/Header";
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

export default function App() {
    const [active, setActive] = useState("");
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
        ],
        []
    );

    // useEffect(() => {
    //     prints.map((print) => {
    //         return print.arts.map((art, idx) => {
    //             const newPosition = new THREE.Vector3(
    //                 (Math.random() * 2 - 1) * idx * 0.5,
    //                 (Math.random() * 2 - 1) * idx * 0.5,
    //                 -idx
    //             );
    //             art.position = newPosition;
    //             return art;
    //         });
    //     });
    // }, []);

    useEffect(() => {
        console.log("rcharge prints");
    }, []);

    return (
        <div className="h-[100vh] w-[100vw]">
            <LoadingAnimation></LoadingAnimation>
            <Header active={active} setActive={setActive}></Header>
            <Canvas>
                <color attach={"background"} args={["#FFFFF4"]}></color>
                <ScrollControls pages={2} damping={0.3}>
                    <StaticScrollElements></StaticScrollElements>
                    <Scroll>
                        {prints.map((print, idx) => (
                            <ProjectPortal
                                key={`portal-${idx}`}
                                print={print}
                                idx={idx}
                                active={active}
                                setActive={setActive}></ProjectPortal>
                        ))}
                    </Scroll>
                </ScrollControls>
            </Canvas>
        </div>
    );
}

const StaticScrollElements = () => {
    const scroll = useScroll();
    const titleRef = useRef<THREE.Mesh>(null);
    const tl = useRef(gsap.timeline({ paused: true }));

    //maybe add the portals here so they don't scroll and animate the mouvement with the tl

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
                        duration: 0.1,
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
