import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Folder from "./pages/Folder";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/folder/:name" element={<Folder />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;