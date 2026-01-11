import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddMood from "./pages/AddMood";
import EditMood from "./pages/EditMood";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddMood />} />
        <Route path="/edit/:id" element={<EditMood />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
