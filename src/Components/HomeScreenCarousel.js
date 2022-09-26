import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Carousel } from "react-bootstrap";
import './Search.css';

function HomeScreenCarousel({ items,setTrackUri}) {

  const handlePlay=(item)=>{
      setTrackUri(item.uri)
  }

  return (
    <Carousel className="homeScreenCara">
      {
        items.map((item)=>(
          <Carousel.Item interval={3000} onClick={()=>handlePlay(item)}>
          <img
            className="c-img"
            src={item.image}
            alt="First slide"

          />
          <Carousel.Caption>
            <div className="c-text">
            <h3>{item.title}</h3>
            <p>{item.artist}</p>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        ))
}
    </Carousel>
  );
}

export default HomeScreenCarousel;