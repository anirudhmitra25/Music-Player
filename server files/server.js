const express = require("express");
const cors = require("cors");
const SpotifyWebApi = require("spotify-web-api-node");
const bodyParser = require("body-parser");
const lyricsFinder = require('lyrics-finder');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/refresh", (req, res) => {
    const refreshToken = req.body.refreshToken;
    const spotifyApi = new SpotifyWebApi({
      clientId: "06be11b92304434a874e436e122ba378",
      clientSecret: "d723dfe2c5804ed8a2ec1cbf4ee6df7d",
      redirectUri: "http://localhost:3000/",
      refreshToken
    })
  
    spotifyApi.refreshAccessToken().then(data=>{

        res.json({
            accessToken: data.body.access_token,
            expiresIn: data.body.expires_in
        })
     
    }).catch((err)=>{
     res.sendStatus(400);
    })
  });

app.post("/login", (req, res) => {
  const code = req.body.code;
  const spotifyApi = new SpotifyWebApi({
    clientId: "06be11b92304434a874e436e122ba378",
    clientSecret: "d723dfe2c5804ed8a2ec1cbf4ee6df7d",
    redirectUri: "http://localhost:3000/",
  })
  console.log(code)
  spotifyApi.authorizationCodeGrant(code).then(data=>{
    console.log("HEREE")
    res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in
    })
  }).catch((err)=>{
    console.log("ERRR")
   res.sendStatus(400);
  })
});
app.get("/lyrics", async(req, res) => {
    const lyrics = await lyricsFinder(req.query.artist,req.query.track)||"No lyrics Found"
    res.json({lyrics});   
  });

app.listen(3001);
