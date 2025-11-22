import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { Share } from "./pages/Share";
import { LandingPage } from "./pages/LandingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
// import ClickSpark from "./components/ClickSpark.jsx";



function App() {
  return (
//     <ClickSpark
//   sparkColor='#fff'
//   sparkSize={10}
//   sparkRadius={15}
//   sparkCount={8}
//   duration={400}
// >
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/share/:shareId" element={<Share />} />
      </Routes>
    </BrowserRouter>
// </ClickSpark>
  );
}

export default App;