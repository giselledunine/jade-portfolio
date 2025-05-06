import { Routes, Route } from "react-router-dom";
import Test from "./Print";
import Layout from "./Layout";
import Home from "./Home";

export default function Routing() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="" element={<Home />} />
                <Route path="/print" element={<Test />} />
            </Route>
        </Routes>
    );
}
