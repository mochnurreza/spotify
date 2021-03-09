import { useEffect } from 'react';
import './App.css';
import Login from './components/login/Login';
import { getTokenFromUrl } from './request/spotify';
import SpotifyWebApi from 'spotify-web-api-js'
import { useDataLayerValue } from './provide/Provider';

const spotify = new SpotifyWebApi()
function App() {

  const [{token}, dispatch] = useDataLayerValue()

  useEffect(() => {
    const hash = getTokenFromUrl()
    window.location.hash =""
    const _token = hash.access_token

    if (_token) {
      spotify.setAccessToken(_token)
      dispatch({
        type: "SET_TOKEN",
        token:_token,
      })
      console.log("[token]", token)
      spotify.setAccessToken(_token)
      spotify.getMe().then((user) => {
        dispatch({
          type: "SET_USER",
          user
        })
      })
      spotify.getUserPlaylists("3276ce5d7d3b4fd58442836337a8034e").then((playlist) => {
        dispatch({
          type: "SET_DISCOVER_WEEKLY",
          discover_weekly: playlist,
        })
      })
    }
  }, [])
  return (
    <div className="App">
      {token ? <h1>Logged in</h1> :
      <Login/>
      }  
    </div>
  );
}

export default App;
