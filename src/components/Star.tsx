import { useTransitionStore } from "@/stores/useTransitionStore";
import { useEffect, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { useLocation } from "react-router-dom";

export default function Star() {
    const [planes, setPlanes] = useState<THREE.Mesh<THREE.PlaneGeometry>[]>([]);
    const { pathname } = useLocation();
    const { isAnimating, starAload } = useTransitionStore((s) => s);
    const rows = 15;
    const cols = 17;

    useEffect(() => {
        console.log("mounted Star");
        return () => console.log("unmounted Star");
    }, []);

    useEffect(() => {
        function startAnimation(onComplete: () => void) {
            planes.forEach((plane) => {
                const delay =
                    (plane.userData.targetY - plane.userData.targetX) * 0.05;

                gsap.to(plane.position, {
                    x: plane.userData.targetX,
                    y: plane.userData.targetY,
                    z: 1,
                    duration: 2.5,
                    delay: delay,
                    ease: "power3.inOut",
                });
                gsap.to(plane.scale, {
                    x: plane.userData.scale,
                    y: plane.userData.scale,
                    duration: 1.5,
                    delay: 1,
                    ease: "power3.inOut",
                });
                gsap.to(plane.rotation, {
                    z: 4,
                    duration: 2.5,
                    delay: delay,
                    ease: "power3.inOut",
                });
            });

            gsap.delayedCall(2.2, () => onComplete?.());
        }

        function exitAnimation(onComplete: () => void) {
            planes.forEach((plane, i) => {
                const delay =
                    (plane.userData.targetY - plane.userData.targetX) * 0.05;
                gsap.to(plane.position, {
                    x: plane.userData.targetXExit,
                    y: plane.userData.targetYExit,
                    z: 1,
                    duration: 2,
                    delay: delay,
                    ease: "power3.inOut",
                });
                gsap.to(plane.scale, {
                    x: 1,
                    y: 1,
                    duration: 1,
                    delay: delay,
                    ease: "power3.inOut",
                });
                gsap.to(plane.rotation, {
                    z: 8,
                    duration: 2,
                    delay: delay,
                    ease: "power3.inOut",
                    onComplete: () => {
                        if (i === planes.length - 1) onComplete?.();
                    },
                });
            });
        }
        if (isAnimating) {
            console.log("startAnimation");
            if (planes.length > 0) {
                startAnimation(() => {
                    exitAnimation(() => {
                        console.log("Transition done ✅");
                    });
                });
            }
        }
    }, [isAnimating, pathname, planes, starAload]);

    useEffect(() => {
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load("/star.png");
        const newPlanes: THREE.Mesh<THREE.PlaneGeometry>[] = [];

        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                const geometry = new THREE.PlaneGeometry(1, 1);
                const material = new THREE.MeshBasicMaterial({
                    color: "#00C21F",
                    alphaMap: texture,
                    transparent: true,
                });
                const mesh = new THREE.Mesh(geometry, material);
                const middlePositionX = x + 0.5 - cols / 2;
                const middlePositionY = y + 0.5 - rows / 2;

                const centerX = (cols - 1) / 2;
                const centerY = (rows - 1) / 2;

                const dx = (x - centerX) / centerX;
                const dy = (y - centerY) / centerY;
                const distanceToCenter = Math.sqrt(dx * dx + dy * dy);
                const normalizedDistance = distanceToCenter / Math.sqrt(2);
                const centerWeight = 1 - normalizedDistance;
                const scale = 0.3 + centerWeight * 10.5;

                mesh.rotation.z = Math.abs(Math.random() * 10);
                mesh.position.x = middlePositionX - cols - 20;
                mesh.position.y = middlePositionY + rows + 20;
                mesh.position.z = 1;
                mesh.userData.targetX = middlePositionX;
                mesh.userData.targetY = middlePositionY;
                mesh.userData.targetXExit = middlePositionX + cols + 20;
                mesh.userData.targetYExit = middlePositionY - rows - 20;
                mesh.userData.scale = scale;

                newPlanes.push(mesh);
            }
        }
        setPlanes(newPlanes);
    }, []);

    return (
        <>
            {planes.map((plane) => (
                <primitive key={plane.uuid} object={plane} />
            ))}
        </>
    );
}
