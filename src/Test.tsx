import { Scroll, ScrollControls, useScroll, Text } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import "./App.css";
import * as THREE from "three";
import {
    Dispatch,
    SetStateAction,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from "react";
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

    return (
        <div className="h-[100vh] w-[100vw]">
            <LoadingAnimation></LoadingAnimation>
            <Header active={active} setActive={setActive}></Header>
            <Canvas>
                <color attach={"background"} args={["#FFFFF4"]}></color>
                <ScrollControls pages={5} damping={0.3}>
                    <StaticScrollElements
                        prints={prints}
                        active={active}
                        setActive={setActive}></StaticScrollElements>
                    <Scroll></Scroll>
                </ScrollControls>
            </Canvas>
        </div>
    );
}

const StaticScrollElements = ({
    prints,
    active,
    setActive,
}: {
    prints: PrintType[];
    active: string;
    setActive: Dispatch<SetStateAction<string>>;
}) => {
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
        <>
            <Text
                ref={titleRef}
                position={[-5, 3, -3]}
                color={"#000000"}
                fontSize={2}>
                Print
            </Text>
            {prints.map((print, idx) => (
                <ProjectPortal
                    printslength={prints.length}
                    key={`portal-${idx}`}
                    print={print}
                    idx={idx}
                    active={active}
                    setActive={setActive}></ProjectPortal>
            ))}
        </>
    );
};
