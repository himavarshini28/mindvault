import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { Share } from "./pages/Share";
import { LandingPage } from "./pages/LandingPage";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/share/:shareId" element={<Share />} />
      </Routes>
    </HashRouter>
  );
}

export default App;