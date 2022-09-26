import React, { useCallback, useEffect, useMemo, useState } from "react";

function ArtistsItemSearch({item}) {
 
  return (
    <div  style={{cursor: "pointer", color: "white",borderRadius:"8px",margin:"auto",justifyItems:"center"}}>
        <div style={{display:"flex",justifyContent:"center"}}>
        <img style={{height:"60px",width:"60px",borderRadius:"50px"}} src={item.image}></img>
        </div>
        <div>
            <div style={{opacity: "0.7",textAlign:"center"}}>{item.artist}</div>
        </div>
      </div>
  );
}

export default ArtistsItemSearch;
