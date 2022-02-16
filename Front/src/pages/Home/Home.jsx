import React, { useState, useEffect } from "react";
import "./Home.css";
import SpotifyWebApi from "spotify-web-api-node";
import useAuth from "../../hooks/useAuth";
import Card from "../../molecules/Card";
import Player from "../../organisms/Player";
import axios from "axios";
import Navbar from "../../organisms/Navbar/Navbar";
import Search from "../../molecules/Search/Search";
import { AppContext } from "./AppContext";

const spotifyApi = new SpotifyWebApi({
  clientId: "e383b0f190f244d0bfb127c2db3ef0d8",
});

function Home({ code }) {
  const accessToken = useAuth(code);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();
  const [lyrics, setLyrics] = useState("");

  const contextValue = {
    isSearchOpen: false,
    initialPlaylist: {},
    playingTrack: {},
  };

  function chooseTrack(track) {
    setPlayingTrack(track);
    setSearch("");
    setLyrics("");
  }
  useEffect(() => {
    if (!playingTrack) return;

    axios
      .get("http://localhost:3001/lyrics", {
        params: {
          track: playingTrack.title,
          artist: playingTrack.artist,
        },
      })
      .then((res) => {
        console.log(res);
        setLyrics(res.data.lyrics);
      });
  }, [playingTrack]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    let cancel = false;
    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return;
      setSearchResults(
        res.body.tracks.items.map((track) => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0]
          );

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          };
        })
      );
    });

    return () => (cancel = true);
  }, [search, accessToken]);

  return (
    <AppContext.Provider value={contextValue}>
      <div className="body">
        <Search />
        <Navbar />
        <div className="songs">
          {searchResults.map((track) => (
            <Card track={track} key={track.uri} chooseTrack={chooseTrack} />
          ))}

          {<div className="lyrics">{lyrics}</div>}
        </div>

        <div className="player">
          <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default Home;
