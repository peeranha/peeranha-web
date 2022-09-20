import {
  SOCKET_CONNECTION,
  SOCKET_CONNECTION_OPEN,
  SOCKET_CONNECTION_CLOSED,
} from './constants';

const initialState = {
  socketData: [],
  isSocketOpen: false,
};

export const socketConnectionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SOCKET_CONNECTION:
      return Object.assign({}, state, { isSocketOpen: false });

    case SOCKET_CONNECTION_OPEN:
      return Object.assign({}, state, {
        isSocketOpen: true,
        socketData: action.socketData,
      });

    case SOCKET_CONNECTION_CLOSED:
      return Object.assign({}, state, {
        isSocketOpen: false,
      });

    default:
      return state;
  }
};
