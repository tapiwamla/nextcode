const io = require('socket.io-client');
const server = require('../server');

let socket;
const socketURL = 'http://localhost:5000';
beforeAll((done) => {
  socket = io.connect(socketURL);
  socket.on('connect', () => {
    done();
  });
});

afterAll((done) => {
  socket.disconnect();
  done();
});

describe('Socket Server Tests', () => {
  it('should handle user connection', (done) => {
    socket.on('connect', () => {
      expect(socket.connected).toBe(true);
      done();
    });
  });

  it('should handle JOIN event', (done) => {
    const roomId = 'room1';
    const username = 'testUser';

    socket.emit('JOIN', { roomId, username });
    socket.on('JOINED', (data) => {
      expect(data.clients).toBeDefined();
      expect(data.username).toBe(username);
      expect(data.socketId).toBeDefined();
      done();
    });
  });

  it('should handle CODE_CHANGE event', (done) => {
    const roomId = 'room1';
    const code = 'const x = 5;';

    socket.emit('CODE_CHANGE', { roomId, code });
    socket.on('CODE_CHANGE', (data) => {
      expect(data.code).toBe(code);
      done();
    });
  });

  it('should handle SYNC_CODE event', (done) => {
    const socketId = '123';
    const code = 'const y = 10;';

    socket.emit('SYNC_CODE', { socketId, code });
    socket.on('CODE_CHANGE', (data) => {
      expect(data.code).toBe(code);
      done();
    });
  });

  it('should handle LEAVE_ROOM event', (done) => {
    const roomId = 'room1';
    const username = 'testUser';

    socket.emit('LEAVE_ROOM', { roomId, username });
    socket.on('DISCONNECTED', (data) => {
      expect(data.socketId).toBeDefined();
      expect(data.username).toBe(username);
      done();
    });
  });
});
