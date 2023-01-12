import { combineReducers } from "redux";

const queue = (state = [], action) => {
  switch (action.type) {
    case 'queue':
      state.push(action.track);
      return state;
    case 'play':
      state[0] = action.track;
      return state;
    default:
      return state
  }
}

const token = (state = '', action) => {
  switch (action.type) {
    case 'setToken':
      state = action.token;
      return state;
    default:
      return state;
  }
};

const reducers = combineReducers({
  queue,
  token
})

export default reducers;