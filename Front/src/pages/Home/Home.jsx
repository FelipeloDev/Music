import React, { useState, useEffect } from "react";
import "./Home.css";
import SpotifyWebApi from "spotify-web-api-node";
import useAuth from "../../hooks/useAuth";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar } from "@material-ui/core";
import Card from "../../molecules/Card";
import Player from "../../organisms/Player";
import axios from "axios";
import NavbarItem from "../../atoms/NavbarItem";

const spotifyApi = new SpotifyWebApi({
  clientId: "e383b0f190f244d0bfb127c2db3ef0d8",
});

function Home({ code }) {
  const accessToken = useAuth(code);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();
  const [lyrics, setLyrics] = useState("");

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
    <div className="body">
      <div className="header__search">
        <SearchIcon />
        <input
          placeholder="Search Artist/Album"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        
      </div>
      <div className="navbar">
      <ul className="nav__list">
        <li className="nav__item"><NavbarItem
        url={'#'}
        icon= {<svg viewBox="0 0 576 512" width="50" height="50" title="home">
        <path d="M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z" />
      </svg>}
        title='Home'
        
        /></li>
        
        
        <li  className="nav__item"><NavbarItem
        url={'#'}
        icon = {<svg xmlns="http://www.w3.org/2000/svg" id="Filled" viewBox="0 0 24 24" width="50" height="50"><path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"/></svg>}
        title = 'Favorites'
        /></li>
        <li className="nav__item"><NavbarItem
          url={'#'}
          icon = {<svg viewBox="0 0 512 512" width="50" height="50" title="cog">
          <path d="M487.4 315.7l-42.6-24.6c4.3-23.2 4.3-47 0-70.2l42.6-24.6c4.9-2.8 7.1-8.6 5.5-14-11.1-35.6-30-67.8-54.7-94.6-3.8-4.1-10-5.1-14.8-2.3L380.8 110c-17.9-15.4-38.5-27.3-60.8-35.1V25.8c0-5.6-3.9-10.5-9.4-11.7-36.7-8.2-74.3-7.8-109.2 0-5.5 1.2-9.4 6.1-9.4 11.7V75c-22.2 7.9-42.8 19.8-60.8 35.1L88.7 85.5c-4.9-2.8-11-1.9-14.8 2.3-24.7 26.7-43.6 58.9-54.7 94.6-1.7 5.4.6 11.2 5.5 14L67.3 221c-4.3 23.2-4.3 47 0 70.2l-42.6 24.6c-4.9 2.8-7.1 8.6-5.5 14 11.1 35.6 30 67.8 54.7 94.6 3.8 4.1 10 5.1 14.8 2.3l42.6-24.6c17.9 15.4 38.5 27.3 60.8 35.1v49.2c0 5.6 3.9 10.5 9.4 11.7 36.7 8.2 74.3 7.8 109.2 0 5.5-1.2 9.4-6.1 9.4-11.7v-49.2c22.2-7.9 42.8-19.8 60.8-35.1l42.6 24.6c4.9 2.8 11 1.9 14.8-2.3 24.7-26.7 43.6-58.9 54.7-94.6 1.5-5.5-.7-11.3-5.6-14.1zM256 336c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z" />
        </svg>}
        title='Log Out'
        /></li>
        <li className="nav__item">
        <a href={'#'}>
        <Avatar
          src={'https://scontent.feoh1-1.fna.fbcdn.net/v/t1.6435-9/72939064_2500859936663617_4947094729129984000_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeHy7EoAPfsJRtN6ZavMbYd38FD0lT6DpgLwUPSVPoOmAr4ZQuINWZwQ3kScsIet_mFhU_y56hAStC40Wg9ikQ3a&_nc_ohc=09m22k6v7E0AX83Fy49&_nc_ht=scontent.feoh1-1.fna&oh=00_AT-RJOJx4gFWaMcWEq63U2qOCr-_4eQp-2D761pQYqFazg&oe=62318501'}
          alt='user'       
        />
        <h4>Felipe</h4>
        </a>
        </li>
      </ul>
        
        
        </div>
    
      <div className="songs">
        {searchResults.map((track) => (
          <Card track={track} key={track.uri} chooseTrack={chooseTrack} />
        ))}

        {searchResults === 0 && <div className="lyrics">{lyrics}</div>}
      </div>

      <div className="player">
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </div>
    </div>
  );
}

export default Home;
