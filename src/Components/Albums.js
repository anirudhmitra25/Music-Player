import React, { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';

function Albums({token}) {
    useEffect(()=>{
        axios.post('http://localhost:3001/albums',{
            token,
        }).then(res=>{
            console.log(res.data);
        }).catch((err)=>{
           console.log(err);
        })
    },[])
  return (
    <div className="App">
    </div>
  );
}

export default Albums;