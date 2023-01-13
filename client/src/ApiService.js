import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';


  const baseUrl = 'http://localhost:4000/';
  
  export const getQueue = (token, trackUri) => {
    axios
      .post(baseUrl + 'get-queue', {
        data: {
          accessToken: token,
          trackUri: trackUri,
        },
      })
      .then((res) => res.data);
  };