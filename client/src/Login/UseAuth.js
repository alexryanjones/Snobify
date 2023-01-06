import { useEffect, useState } from "react";
import axios from "axios";

function UseAuth (code) {

  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState()

  useEffect(() => {
    axios.post('http://localhost:4000/login', {
      code
    }).then((response) => {
      setAccessToken(response.data.accessToken);
      setRefreshToken(response.data.refreshToken);
      setExpiresIn(response.data.expiresIn);
      window.history.pushState({}, null, '/');
    })
    // .catch(() => window.location = '/')
  }, [code]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;
    const interval = setInterval(() => {
      axios
      .post('http://localhost:4000/refresh', {
        refreshToken,
      })
      .then((response) => {
        setAccessToken(response.data.access_token);
        setExpiresIn(response.data.expires_in);
      });
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);
  
  return accessToken;
};


export default UseAuth;