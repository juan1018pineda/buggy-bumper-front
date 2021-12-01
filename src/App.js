import React, { useState } from "react";
import "./App.scss";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

import Login from "./Components/Login";
import CarList from "./Components/CarList";
import Home from "./Components/Home";

function App() {
  const authorized = localStorage.getItem("authorized");
  const [auth, setAuth] = useState(authorized);

  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={<Login auth={auth} setAuth={setAuth} />}
        ></Route>
        <Route
          exact
          path="/admin"
          element={<CarList auth={auth} setAuth={setAuth} />}
        ></Route>
        <Route exact path="/home" element={<Home />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
