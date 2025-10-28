import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { Share } from "./pages/Share";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" replace />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/share/:shareId" element={<Share />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;