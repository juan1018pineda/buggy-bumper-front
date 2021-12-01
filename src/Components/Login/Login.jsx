import React, { useEffect } from "react";

import "./Login.scss";

import { checkLogin } from "../../api/adminUsers";

import { useNavigate } from "react-router-dom";

const Login = ({ auth, setAuth }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (auth) {
      navigate("/admin");
    }
  }, [auth, navigate]);

  const handleLogin = async (event) => {
    event.preventDefault();
    const email = event.target[0].value;
    const password = event.target[1].value;
    const login = { email, password };

    const newAuth = await checkLogin(login);
    if (newAuth) {
      localStorage.setItem("authorized", email);
    }
    setAuth(newAuth);
  };

  return (
    <div className="login-container">
      <section className="login-titles">
        <h1>
          BUGGY &<br /> BUMPER, INC
        </h1>
        <h2>LA MEJOR RED DE ALQUILER DE AUTOS</h2>
      </section>
      <form className="login-form" onSubmit={handleLogin}>
        <input type="text" placeholder="Usuario" autoComplete="email" />
        <input
          type="password"
          placeholder="Clave"
          autoComplete="current-password"
        />
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
};

export default Login;
