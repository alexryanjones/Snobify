import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setReduxAccessToken } from "../Redux/accessToken";
import axios from "axios";

function UseAuth (code) {

  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState()
  const dispatch = useDispatch();

  // Get access token
  useEffect(() => {
    try {
      const login = async () => {
      const response = await axios.post('http://localhost:4000/login', {code})

      setAccessToken(response.data.accessToken);
      dispatch(setReduxAccessToken(response.data.accessToken));
      setRefreshToken(response.data.refreshToken);
      setExpiresIn(response.data.expiresIn);

      window.history.pushState({}, null, '/');
      }
      login()
    // .catch(() => window.location = '/')
    } catch (err) {
      window.location = '/'
      window.alert('Could not log in: ', err)
    }
  }, [code]);

  // Refresh access token
  useEffect(() => {
    try {
    if (!refreshToken || !expiresIn) return;
    const interval = setInterval(() => {
      axios
      .post('http://localhost:4000/refresh', {
        refreshToken,
      })
      .then((response) => {
        setAccessToken(response.data.access_token);
        dispatch(setReduxAccessToken(response.data.accessToken));
        setExpiresIn(response.data.expires_in);
      });
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  } catch (err) {
    window.alert('Could not refresh token: ', err)
  }
  }, [refreshToken, expiresIn]);
  
  return accessToken;
}


export default UseAuth;