import React from "react";
import "./Login.css";

const AUTH_URL =
"https://accounts.spotify.com/authorize?client_id=e383b0f190f244d0bfb127c2db3ef0d8&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"


function Login() {
  return (
    <div className="login">
  <img
    src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
    alt="AppLogo"
  />
  <a href={AUTH_URL}>Login with Spotify</a>
  </div>
  )
}

export default Login