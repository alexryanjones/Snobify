export const setToken = (token) => ({
  type: 'setToken',
  token: token,
})

export const addToQueue = (track) => ({
  type: 'queue',
  action: track,
});

export const play = (track) => ({
  type: 'play',
  action: track,
});