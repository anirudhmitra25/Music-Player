import React, { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import SpotifyPlayer from "react-spotify-web-playback";
import { Button } from 'react-bootstrap';

function Player({accessToken,trackUri}) {
  console.log(trackUri)
const [play,setPlay]=useState(true);
useEffect(()=>{
    setPlay(true)
},[trackUri])
if(!accessToken) return null;
  return (
    <SpotifyPlayer
        token={accessToken}
        // callback={state=>{
        //     if(!state.isPlaying) setPlay(false)
        // }}
        play={play}
        uris={trackUri?[trackUri]:[]}
    />
  );
}

export default Player;