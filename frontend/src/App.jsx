
// import './App.css'
// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// // import Home from "./pages/Home";
// import Signup from "./pages/Signup";
// import Login from "./pages/Login";
// import Profile from "./pages/Profile";
// // import Navbar from "./pages/Navbar"
// import { Provider } from "react-redux"
// import appStore from './utils/appStore';
// import Homepage from './pages/Homepage';
// import Body from './pages/Body';
// import About from './pages/About';

// const App = () => {
//   return (
//     // <Navbar/>
//     // <Router>
//     //   <Routes>
//     //     <Route path="/home" element={<Home />} />
//     //     <Route path="/signup" element={<Signup />} />
//     //     <Route path="/login" element={<Login />} />
//     //     <Route path="/profile" element={<Profile />} />
//     //   </Routes>
//     // </Router>
//     <Provider store={appStore}>
//       <BrowserRouter basename="/">
//         <Routes>
//           <Route path="/" element={<Body />}>
//             <Route path="/" element={<Homepage />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/profile" element={<Profile />} />
//             <Route path="/about" element={<About />} />
//           </Route>
//         </Routes>
//       </BrowserRouter>
//     </Provider>
//   );
// };

// export default App;





import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Homepage from "./pages/Homepage";
import Body from "./pages/Body";
import About from "./pages/About";
import ApplyPass from "./pages/ApplyPass";
import Admin from "./pages/Admin";
import ViewPass from "./pages/ViewPass";

const App = () => {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route index element={<Homepage />} /> {/* Default route */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About />} />
            <Route path="/applypass" element={<ApplyPass />} />
            <Route path="/viewpass" element={<ViewPass />} />
          </Route>
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
