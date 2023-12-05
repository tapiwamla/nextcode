import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EditorPage from './EditorPage'; // Import the component from the correct location

// Mock the socket initialization function (initSocket) since we cannot actually connect to a socket in a test.
jest.mock('../socket', () => ({
  initSocket: jest.fn(),
}));

// Mock react-router-dom functions
jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
  useLocation: () => ({
    state: { username: 'testUsername' }, // Replace with your test username
  }),
  useParams: () => ({ roomId: 'testRoomId' }), // Replace with your test room ID
  Navigate: jest.fn(),
}));

describe('EditorPage Component', () => {
  beforeEach(() => {
    // Clear any mocked function calls before each test
    jest.clearAllMocks();
  });

  it('renders without errors', () => {
    render(<EditorPage />);
  });

  it('displays connected clients', () => {
    const testClients = [
      { socketId: 'client1', username: 'user1' },
      { socketId: 'client2', username: 'user2' },
    ];
    // Mock the connected clients by setting them in the state
    jest.spyOn(React, 'useState').mockReturnValueOnce([testClients, jest.fn()]);

    render(<EditorPage />);

    testClients.forEach((client) => {
      const clientElement = screen.getByText(client.username);
      expect(clientElement).toBeInTheDocument();
    });
  });

  it('copies room ID to clipboard when the button is clicked', async () => {
    // Mock the clipboard writeText function
    const clipboardWriteText = jest.fn();
    global.navigator.clipboard.writeText = clipboardWriteText;

    render(<EditorPage />);

    const copyButton = screen.getByText('Copy ROOM ID');
    fireEvent.click(copyButton);

    // Ensure that clipboard.writeText was called with the room ID
    expect(clipboardWriteText).toHaveBeenCalledWith('testRoomId'); // Replace with your test room ID
  });

  it('leaves the room when the button is clicked', () => {
    // Mock socket emit and reactNavigate
    const socketEmit = jest.fn();
    const reactNavigate = jest.fn();
    jest.spyOn(React, 'useRef').mockReturnValueOnce({ current: { emit: socketEmit } });
    jest.spyOn(React, 'useNavigate').mockReturnValueOnce(reactNavigate);

    render(<EditorPage />);

    const leaveButton = screen.getByText('Leave');
    fireEvent.click(leaveButton);

    // Ensure that socket.emit was called with the correct action and parameters
    expect(socketEmit).toHaveBeenCalledWith('LEAVE_ROOM', {
      roomId: 'testRoomId', // Replace with your test room ID
      username: 'testUsername', // Replace with your test username
    });
    // Ensure that reactNavigate was called with the correct location
    expect(reactNavigate).toHaveBeenCalledWith('/');
  });
});
