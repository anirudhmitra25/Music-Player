import React, { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Container, Form,Button } from "react-bootstrap";
import './Search.css';
import {debounce, set} from "lodash";

function Search({ spotifyApi,accessToken,setShowModal,setSearchResults,setArtistsResult}) {

  const [search, setSearch] = useState();
  const [isValid,setIsValid] = useState(false);

  useEffect(()=>{

    if (!search) {
      setShowModal(false);
      return;
    }
    if (!accessToken) {
      return;
    }

    spotifyApi.searchTracks(search).then((res) => {
      setSearchResults(
        res.body.tracks.items.map((track)=>{
          const smallestAlbumImage = track.album.images.reduce((smallest,img)=>{
            if(smallest.height<img.height) return smallest
            else return img; 
          },[track.album.images[0]])
          return{
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            image: smallestAlbumImage.url,
          }
        })
      )

    });

    spotifyApi.searchArtists(search,{ limit: 5, offset: 0 }).then((res)=>{
      setArtistsResult(
        res.body.artists.items.map((artist)=>{
          const smallestAlbumImage = artist.images.reduce((smallest,img)=>{
            if(smallest.height<img.height) return smallest
            else return img; 
          },[artist.images[0]])
          return{
            artist: artist.name,
            image: smallestAlbumImage.url,
          }
        })
      )
    })

    setShowModal(true);

  },[search,accessToken])

  const handleSearch=(e)=>{
   setSearch(e.target.value);
  }

  const debouncedResult=useMemo((e)=>{
    return debounce(handleSearch,600)
  },[])

  useEffect(() => {
    return () => {
      debouncedResult.cancel();
    };
  });

  return (
    <div className="search-box">
      <Form.Control
        type="search"
        placeholder="Search Songs, Artists, Albums.."
        // className="search"
        style={{
          marginTop: "9px",
          marginRight: "5px",
          width: "800px",
          borderRadius: "30px",
          backgroundColor: "#21201E",
          borderColor: "#3C3F42",
          color: "white",
        }}
        onChange={debouncedResult}
      />
      </div>
  );
}

export default Search;
