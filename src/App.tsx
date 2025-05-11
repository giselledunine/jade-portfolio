import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import "./App.css";
import Print from "./Print";
import Branding from "./Branding";
import Art from "./Art";
import { ThemeProvider } from "./ThemeProvider";
import Photographie from "./Photographie";

export default function App() {
    return (
        <ThemeProvider>
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="print" element={<Print />} />
                        <Route path="branding" element={<Branding />} />
                        <Route path="photographie" element={<Photographie />} />
                        <Route path="art" element={<Art />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}
