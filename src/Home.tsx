import { Text, Scroll } from "@react-three/drei";
import gsap from "gsap";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";
import { useTransitionStore } from "./stores/useTransitionStore";

export default function Home() {
    const [starAnimate, setStarAnimate] = useState(false);
    const { isAnimating } = useTransitionStore((s) => s);
    const starRef = useRef<THREE.Mesh>(null);
    const star2Ref = useRef<THREE.Mesh>(null);
    const homeRef = useRef<HTMLDivElement>(null);
    const tl = useRef(gsap.timeline());
    const starTexture = useMemo(
        () => new THREE.TextureLoader().load("/star.png"),
        []
    );
    useEffect(() => {
        console.log("Mounted Home");

        return () => {
            console.log("Unmounted Home");
        };
    }, []);

    useEffect(() => {
        if (isAnimating) {
            gsap.to(homeRef.current, {
                opacity: 0,
                duration: 2,
            });
        }
    }, [isAnimating]);

    useLayoutEffect(() => {
        tl.current = gsap.timeline({ paused: true, repeat: -1 });
        if (starRef.current && star2Ref.current) {
            tl.current
                .to(
                    starRef.current?.rotation,
                    { z: -0.7, ease: "back.inOut" },
                    0
                )
                .to(
                    starRef.current?.rotation,
                    { z: -0.5, ease: "back.inOut" },
                    0.3
                );
            tl.current
                .to(
                    star2Ref.current?.rotation,
                    { z: -0.3, ease: "back.inOut" },
                    0
                )
                .to(
                    star2Ref.current?.rotation,
                    { z: -0.5, ease: "back.inOut" },
                    0.3
                );
        }

        // Optional: cleanup when unmounting
        return () => {
            tl.current?.kill();
        };
    }, []);

    useEffect(() => {
        if (starAnimate) {
            gsap.to(tl.current, {
                timeScale: 1,
                duration: 0.2,
                ease: "power2.out",
                onComplete: () => {
                    tl.current?.play();
                },
            });
        } else {
            gsap.to(tl.current, {
                timeScale: 0,
                duration: 0.2,
                ease: "power2.in",
                onComplete: () => {
                    tl.current?.pause();
                },
            });
        }
    }, [starAnimate]);

    return (
        <>
            <Scroll html>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 1 }}
                    ref={homeRef}
                    className="w-[100vw] h-[100vh] flex justify-center gap-[150px] flex-col items-center p-8">
                    <div className="w-[80%] flex justify-between">
                        <h1 className="text-5xl">Kaïdi Jade</h1>
                        <div className="flex flex-col">
                            <p className="text-right text-3xl font-thin font-secondary">
                                Directrice Artistique
                            </p>
                            <p className="text-right text-3xl font-thin font-secondary">
                                Designer graphique
                            </p>
                            <p className="text-right text-3xl font-thin font-secondary">
                                Photographe
                            </p>
                            <p className="text-right text-3xl font-thin font-secondary">
                                UX/UI
                            </p>
                        </div>
                    </div>
                    <p className="text-3xl font-thin w-[80%] pr-[25%]">
                        Diplômée d'un master en direction artistique et design
                        graphique au Campus de la fonderie de l'image en 2023,
                        je suis une directrice artistique et graphiste avec 2
                        ans d'expérience en alternance en tant que UX/UI junior
                        au sein d'une agence de digitale. J’interviens sur des
                        projets variés allant de la réalisation d'un logo à
                        celui d'un site web.
                    </p>
                </motion.div>
            </Scroll>
            <mesh
                onPointerEnter={() => setStarAnimate(true)}
                onPointerLeave={() => setStarAnimate(false)}
                ref={starRef}
                position={[-2, 2, 0]}
                rotation={[0, 0, -0.5]}
                scale={2}>
                <planeGeometry args={[1, 1]}></planeGeometry>
                <meshBasicMaterial
                    side={2}
                    map={starTexture}
                    transparent={true}></meshBasicMaterial>
            </mesh>
            <mesh
                onPointerEnter={() => setStarAnimate(true)}
                onPointerLeave={() => setStarAnimate(false)}
                ref={star2Ref}
                position={[3, -3, 0]}
                rotation={[0, 0, -0.5]}
                scale={8}>
                <planeGeometry args={[1, 1]}></planeGeometry>
                <meshBasicMaterial
                    side={2}
                    map={starTexture}
                    transparent={true}></meshBasicMaterial>
            </mesh>
        </>

        // <group>
        //     <Text
        //         font="/Helvetica.ttf"
        //         color={"#000"}
        //         scale={0.4}
        //         anchorX={"left"}
        //         position={[-4, 2.5, 0]}>
        //         Kaïdi Jade
        //     </Text>
        //     <Text
        //         font="/Helvetica.ttf"
        //         color={"#000"}
        //         scale={0.2}
        //         anchorX={"right"}
        //         position={[4, 2.5, 0]}>
        //         Directrice Artistique
        //     </Text>
        //     <Text
        //         font="/Helvetica.ttf"
        //         color={"#000"}
        //         scale={0.2}
        //         anchorX={"right"}
        //         position={[4, 2.2, 0]}>
        //         Designer Graphique
        //     </Text>
        //     <Text
        //         font="/Helvetica.ttf"
        //         color={"#000"}
        //         scale={0.2}
        //         anchorX={"right"}
        //         position={[4, 1.9, 0]}>
        //         Photographe
        //     </Text>
        //     <Text
        //         font="/Helvetica.ttf"
        //         color={"#000"}
        //         scale={0.2}
        //         anchorX={"right"}
        //         position={[4, 1.6, 0]}>
        //         UX/UI
        //     </Text>
        //     <Text
        //         font="/MinionPro-Medium.otf"
        //         color={"#000"}
        //         scale={0.2}
        //         anchorX={"left"}
        //         position={[-4, 0.5, 0]}>
        //         Diplômée d'un master en direction artistique et design graphique
        //         au Campus de la fonderie de l'image en 2023, je suis une
        //         directrice artistique et graphiste avec 2 ans d'expérience en
        //         alternance en tant que UX/UI junior au sein d'une agence de
        //         digitale. J’interviens sur des projets variés allant de la
        //         réalisation d'un logo à celui d'un site web.
        //     </Text>
        // </group>
    );
}
