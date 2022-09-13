import { useEffect, useRef, useState, useCallback } from 'react';
// import {
//   SOCKET_CONNECTION,
//   SOCKET_CONNECTION_OPEN,
//   SOCKET_CONNECTION_CLOSED,
// } from './constants';

const useSocketConnection = () => {
  const SERVICE_URL = '7m8tklg966.execute-api.us-east-2.amazonaws.com/dev3';
  const socket = useRef(WebSocket);
  console.log(1);
  const [isConnected, setIsConnected] = useState(false);
  console.log(2);
  const [connectionId, setConnectionId] = useState(undefined);
  console.log(3);
  const [callBackUrl, setCallBackUrl] = useState(undefined);

  useEffect(
    () => {
      connectSocket();
      console.log('useEffect');
    },
    [isConnected, connectionId, callBackUrl],
  );

  const connectSocket = () => {
    if (socket.current?.readyState !== WebSocket.OPEN) {
      socket.current = new WebSocket(SERVICE_URL);
      console.log('connectSocket');
      socket.current.addEventListener('open', onSocketOpen);
      console.log('open');
      socket.current.addEventListener('close', onSocketClosed);
      console.log('close');
      socket.current.addEventListener('message', ({ data }) => {
        onSocketMessage(data);
      });
    }
  };

  // This function is used from the useSocketData hook :)
  const reconnectSocket = () => {
    connectSocket();
    console.log('reconnectSocket');
  };

  // Event listener to when the socket opens
  const onSocketOpen = useCallback(() => {
    console.log('onSocketOpen');
    socket.current.send(
      JSON.stringify({
        action: '$default',
      }),
    );
    setIsConnected(true);
  }, []);

  // Event listener to when the socket closes
  const onSocketClosed = useCallback(() => {
    console.log('onSocketClosed');
    setIsConnected(false);
  }, []);

  // Event listener to when the socket sends a message
  const onSocketMessage = useCallback(data => {
    console.log('onSocketMessage');
    if (data !== '') {
      const socketData = JSON.parse(data);
      socketData.reconnectSocket = reconnectSocket;
      setConnectionId(socketData?.connectionId);
      setCallBackUrl(socketData?.callbackUrlForAWS);
      console.log('setCallBackUrl');
      // If the socket sent a notification
      // if (socketData?.notification) {
      //   const { title, description, type } = socketData.notification;
      //   // You can trigger a notification here.
      //   // title, description and type are things I send from the back-end.
      //   // You can basically send anything from the back-end and structure it as you want from here :)
      // }
    }
  }, []);
};

export default useSocketConnection;
