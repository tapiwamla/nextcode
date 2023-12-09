/**
 * Actions
 * 
 * Contains all possible actions that can be emitted by the socket.io server.
 * 
 * @module
 * @author [Tapiwanashe Mlambo](https://github.com/tapiwamla)
 */

const ACTIONS = {
    JOIN: 'join',
    JOINED: 'joined',
    DISCONNECTED: 'disconnected',
    CODE_CHANGE: 'code-change',
    SYNC_CODE: 'sync-code',
    LEAVE: 'leave',
    LEAVE_ROOM: 'leave-room',
};

module.exports = ACTIONS;