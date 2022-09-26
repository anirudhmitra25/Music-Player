import React, { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Container, Form,Button } from "react-bootstrap";

function SearchItem({item,setTrackUri,setTrackArtist,setTrackTitle}) {
    const handlePlay=()=>{
        setTrackUri(item.uri)
        setTrackArtist(item.artist);
        setTrackTitle(item.title);
    }
  return (
    <div className="d-flex m-2 align-items-center" style={{cursor: "pointer", color: "white",borderRadius:"8px"}} onClick={handlePlay}>
        <img src={item.image}></img>
        <div className="ml-8">
            <div style={{marginLeft: "15px"}}>{item.title}</div>
            <div style={{marginLeft: "15px",opacity: "0.7"}}>{item.artist}</div>
        </div>
      </div>
  );
}

export default SearchItem;
