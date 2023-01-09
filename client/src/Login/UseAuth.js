import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setReduxAccessToken } from "../Redux/accessToken";
import axios from "axios";

function UseAuth (code) {

  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState()
  const dispatch = useDispatch();

  useEffect(() => {
    axios.post('http://localhost:4000/login', {
      code
    }).then((response) => {
      setAccessToken(response.data.accessToken);
      dispatch(setReduxAccessToken(response.data.accessToken));
      setRefreshToken(response.data.refreshToken);
      setExpiresIn(response.data.expiresIn);
      window.history.pushState({}, null, '/');
    }).then(() => {
      
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
        dispatch(setReduxAccessToken(response.data.accessToken));
        setExpiresIn(response.data.expires_in);
      });
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);
  
  return accessToken;
};


export default UseAuth;