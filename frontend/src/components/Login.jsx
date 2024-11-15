import React, { useEffect, useState } from "react";
import AuthLogin from "./AuthLogin.jsx";
import AuthSignup from "./AuthSignup.jsx";
// import MetaLogin from "./MetaLogin.jsx";
import Dashboard from "./Dashboard.jsx";
import Background from "./Background.jsx";
import Header from "./Header.jsx";

const Login = () => {
  const [stat, setStat] = useState("test");

  return (
    <>
      <Background>
        <Header></Header>

        {stat == "test" && <Dashboard setStat={setStat}></Dashboard>}
        {stat == "signup" && <Dashboard setStat={setStat}></Dashboard>}
        {stat == "login" && <AuthLogin setStat={setStat}></AuthLogin>}
        {stat == "meta" && <MetaLogin setStat={setStat}></MetaLogin>}
      </Background>
    </>
  );
};

export default Login;
