import React, { useCallback, useEffect, useMemo, useState } from "react";
import useAuth from "./useAuth";
import axios from "axios";
import { Button, Container, Form, Modal } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import Search from "./Components/Search";
import HomeScreenCarousel from "./Components/HomeScreenCarousel";
import { saveaccessToken } from "./redux/actions";
import { useDispatch, useSelector } from "react-redux";
import SearchItem from "./Components/SearchItem";
import "./Dashboard.css";
import Player from "./Components/Player";
import Lyrics from "./Components/LyricsModal";
import ArtistsItemSearch from "./Components/ArtistItemSearch";
import { SpectrumVisualizer, SpectrumVisualizerTheme } from 'react-audio-visualizers';

const spotifyApi = new SpotifyWebApi({
  clientId: "06be11b92304434a874e436e122ba378",
});

function Dashboard(props) {
  const accessToken = useAuth(props.code);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [artistResults, setArtistResults] = useState([]);
  const [trackUri, setTrackUri] = useState("");
  const [trackTitle, setTrackTitle] = useState("");
  const [trackArtist, setTrackArtist] = useState("");
  const [newReleases, setNewReleases] = useState([]);
  const [lyrics,setLyrics] = useState("");
  const [openlyrics,setOpenLyrics] = useState(false);

  useEffect(() => {
    if (!accessToken) {
      return;
    }
    spotifyApi.setAccessToken(accessToken);
    dispatch(saveaccessToken(accessToken));
  }, [accessToken]);

  useEffect(()=>{
    if(!trackUri) return;

    axios.get("http://localhost:3001/lyrics",{
      params:{
        track: trackTitle,
        artist: trackArtist
      }
    }).then((res)=>{
      setLyrics(res.data.lyrics)
      setShowModal(false);
      setOpenLyrics(false);
    })
  },[trackUri])

  useEffect(() => {
    if (!accessToken) {
      return;
    }
    spotifyApi
      .getNewReleases({ limit: 5, offset: 0, country: "US" })
      .then((res) => {
        setNewReleases(
          res.body.albums.items.map((track) => {
            const largestAlbumImage = track.images.reduce(
              (largestImg, img) => {
                if (largestImg.height > img.height) return largestImg;
                else return img;
              },
              [track.images[0]]
            );
            return {
              artist: track.artists[0].name,
              title: track.name,
              uri: track.uri,
              image: largestAlbumImage.url,
            };
          })
        );
      });
  }, [accessToken]);

  return (
    <>
      <div
        style={{
          backgroundColor: "#2E3033",
          height: 60,
        }}
      >
        <Search
          spotifyApi={spotifyApi}
          accessToken={accessToken}
          setShowModal={setShowModal}
          setSearchResults={setSearchResults}
          setArtistsResult={setArtistResults}
        />
      </div>
     
      {
        lyrics!==""&&
      <Lyrics lyrics={lyrics} openlyrics={openlyrics}/>
}

{showModal && (
        <div className="search-results">
         { artistResults.length>0&& <h1 style={{fontSize: 25}}>Artists</h1>}
          <div style={{display:"flex",flexDirection:"row"}} >
          {
            artistResults.length>0?(
            
              
              artistResults.map((item)=>(
                <ArtistsItemSearch item={item}/>
              ))

            
            ):(
              <>
              </>
            )
          }
          </div>
          <div style={{marginTop:"20px"}}>
          { searchResults.length>0&& <h1 style={{fontSize: 25}}>Songs</h1>}
          {searchResults.length > 0 ? (
            searchResults.map((item) => (
              <SearchItem item={item} setTrackUri={setTrackUri} setTrackArtist={setTrackArtist} setTrackTitle={setTrackTitle} />
            ))
          ) : (
            <div style={{ margin: "auto", textAlign: "center" }}>
            </div>
          )}
          </div>
        </div>
      )}
      {trackUri && (
        <div style={{ position: "fixed", bottom: 0, width: "100%"}}>
          {/* <Button onClick={()=>setOpenLyrics(true)} style={{position:"fixed", bottom: 15,right:85,cursor:"pointer"}}>lyrics</Button> */}
          <Player accessToken={accessToken} trackUri={trackUri} />
        </div>
      )}
    </>
  );
}

export default Dashboard;
