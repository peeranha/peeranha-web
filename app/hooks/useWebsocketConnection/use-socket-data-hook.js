import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const useSocketData = () => {
  const isConnected = useSelector(
    ({ socketConnections }) => socketConnections.isSocketOpen,
  );
  const socketData = useSelector(
    ({ socketConnections }) => socketConnections.socketData,
  );

  //Reconnect if the socket was closed for some reason
  useEffect(
    () => {
      if (!isConnected) {
        console.log('Socket not connected !');
        try {
          socketData?.reconnectSocket();
        } catch (err) {
          console.log(
            "'useSocketConnection' hook was not called before 'useSocketData' hook",
          );
        }
      }
    },
    [isConnected],
  );

  return {
    isConnected: isConnected,
    socketData: socketData,
  };
};

export default useSocketData;
