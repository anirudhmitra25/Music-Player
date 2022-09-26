import './App.css';

import React from 'react';
const AUTH_URL='https://accounts.spotify.com/authorize?client_id=06be11b92304434a874e436e122ba378&response_type=code&redirect_uri=http://localhost:3000/&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state';

function Login() {

  return (
    <>
      <a href={AUTH_URL}>
        Login
      </a>
    </>
  );
}

export default Login;