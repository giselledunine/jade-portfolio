import { Scroll, Text } from "@react-three/drei";
import { useEffect } from "react";

export default function Home() {
    useEffect(() => {
        console.log("Mounted");
        return () => {
            console.log("Unmounted");
        };
    }, []);
    return (
        <Scroll>
            <Text
                font="/Helvetica.ttf"
                color={"#000"}
                scale={0.5}
                anchorX={"left"}
                position={[-4, 2.5, 0]}>
                Kaïdi Jade
            </Text>
            <Text
                font="/Helvetica.ttf"
                color={"#000"}
                scale={0.2}
                anchorX={"right"}
                position={[4, 2.5, 0]}>
                Directrice Artistique
            </Text>
            <Text
                font="/Helvetica.ttf"
                color={"#000"}
                scale={0.2}
                anchorX={"right"}
                position={[4, 2.2, 0]}>
                Designer Graphique
            </Text>
            <Text
                font="/Helvetica.ttf"
                color={"#000"}
                scale={0.2}
                anchorX={"right"}
                position={[4, 1.9, 0]}>
                Photographe
            </Text>
            <Text
                font="/Helvetica.ttf"
                color={"#000"}
                scale={0.2}
                anchorX={"right"}
                position={[4, 1.6, 0]}>
                UX/UI
            </Text>
            <Text
                font="/MinionPro-Medium.otf"
                color={"#000"}
                scale={0.2}
                anchorX={"left"}
                position={[-4, 0.5, 0]}>
                Diplômée d'un master en direction artistique et design graphique
                au Campus de la fonderie de l'image en 2023, je suis une
                directrice artistique et graphiste avec 2 ans d'expérience en
                alternance en tant que UX/UI junior au sein d'une agence de
                digitale. J’interviens sur des projets variés allant de la
                réalisation d'un logo à celui d'un site web.
            </Text>
        </Scroll>
    );
}
