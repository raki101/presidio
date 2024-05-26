import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Components/Signup";
import SellerItems from "./Components/AddSellerItems";
import Login from "./Components/Login";
import DisplaySellerItems from "./Components/displaySellerItems";
// import DisplaySellerItems from "./Components/DisplaySellerItems";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />{" "}
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/selleritems" element={<SellerItems />} />
          <Route path="/displayselleritems" element={<DisplaySellerItems />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
