import React, { useState } from "react";
import SocialButton from "./SocialButton";
import { useHistory } from "react-router-dom";
import { Margin } from "@mui/icons-material";

export default function SocialLogin() {
  // console.log(user)
  let history = useHistory();
  const [info, setInfo] = useState({});
  const handleSocialLogin = (user) => {
    if (user !== null) {
      setInfo(user._profile);
      console.log(user._profile);
    }
    history.push("/budget");

    // setInfo(user)
    console.log(user._profile);
  };
  const handleSocialLoginFailure = (err) => {
    console.error(err);
  };
  console.log(info);
  return (
    <div>
      <SocialButton
        provider="facebook"
        appId="380754813776401"
        onLoginSuccess={handleSocialLogin}
        onLoginFailure={handleSocialLoginFailure}
        style={{
          backgroundColor: "skyblue",
          border: "none",
          color: "black",
          padding: "7px",
          marginLeft: "150px",
          marginTop: "-20px",
          borderRadius: "10px",
        }}
      >
        Login with Facebook
      </SocialButton>
      <SocialButton
        provider="google"
        appId="151638728182-5vc7vhb1hv7jamr02f2hlqlds98434m9.apps.googleusercontent.com"
        onLoginSuccess={handleSocialLogin}
        onLoginFailure={handleSocialLoginFailure}
        style={{
          backgroundColor: "yellow",
          border: "none",
          color: "black",
          padding: "7px",
          marginLeft: "30px",
          marginTop: "-20px",
          borderRadius: "10px",
        }}
      >
        Login with Google
      </SocialButton>
    </div>
  );
}
