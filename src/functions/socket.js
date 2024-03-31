import { io } from "socket.io-client";

export const initSocket = async () => {
    const options = {
        'Force new connection': true,
        reconnectionAttempt: 'Infinity',
        timeout: 10000,
        transports: [ 'websocket' ]
    };
  
    // Connect to the socket.io server
    return io(process.env.REACT_APP_BACKEND_URL, options);
  };
  