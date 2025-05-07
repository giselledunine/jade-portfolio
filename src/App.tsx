import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import "./App.css";
import Print from "./Print";
import Branding from "./Branding";
import Art from "./Art";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout></Layout>}>
                    <Route path="/" element={<Home />} />
                    <Route path="/print" element={<Print />} />
                    <Route path="/branding" element={<Branding />} />
                    <Route path="/art" element={<Art />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
