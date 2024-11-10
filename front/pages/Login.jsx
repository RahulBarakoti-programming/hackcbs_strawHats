import React, { useEffect, useState } from "react";
import AuthLogin from "./AuthLogin.jsx";
import AuthSignup from "./AuthSignup.jsx";
import Background from "./Background.jsx";
import Header from "./Header.jsx";

const Login = () => {
  const [stat, setStat] = useState("test");

  return (
    <>
      <Background>
        <Header></Header>

        {stat == "signup" && <AuthSignup setStat={setStat}></AuthSignup>}
        {stat == "login" && <AuthLogin setStat={setStat}></AuthLogin>}
      </Background>
    </>
  );
};

export default Login;
