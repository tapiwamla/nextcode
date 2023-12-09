import { io } from "socket.io-client";

/**
 * Initialize a socket connection to the backend server.
 *
 * @returns {object} - The socket connection object.
 */
export const initSocket = async () => {
    const options = {
        'force new connection': true,
        reconnectionAttempt: 'Infinity',
        timeout: 10000,
        transports: [ 'websocket' ]
    };

    return io(process.env.REACT_APP_BACKEND_URL, options);
};
