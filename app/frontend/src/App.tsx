import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import RegisterMeet from "./pages/RegisterMeet";





const AppContent = () => {


  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/new" element={<RegisterMeet />} />
    </Routes>
  );
};

function App() {
  return (
    <>
      <BrowserRouter basename="/meet">
        <AppContent />
      </BrowserRouter>
    </>
  );
}

export default App;