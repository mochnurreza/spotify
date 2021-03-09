export const authEndpoint = "https://accounts.spotify.com/authorize";
const redirectUri = "https://localhost:3000/";
const ID_KEY = '3276ce5d7d3b4fd58442836337a8034e'

const scopes = [
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-top-read",
    "user-modify-playback-state",
  ];

  export const getTokenFromUrl = () => {
      return window.location.hash
      .substring(1)
      .split("&")
      .reduce((initial, item) => {
          let parts = item.split("=")
          initial[parts[0]] = decodeURIComponent(parts[1])
          return initial
      }, {})
  }

  export const loginUrl = `${authEndpoint}?client_id=${ID_KEY}&redirect_uri=${redirectUri}&scope=${scopes.join(
    "%20"
  )}&response_type=token&show_dialog=true`;