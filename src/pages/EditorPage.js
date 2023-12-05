import React, { useEffect, useRef, useState } from 'react';
import Client from '../components/Client';
import Editor from '../components/Editor';
import { initSocket } from '../socket';
import ACTIONS from '../user-actions/Actions';
import { useLocation, useNavigate, Navigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

function EditorPage() {
  const socketRef = useRef(null);
  const codeRef = useRef(null);
  const location = useLocation();
  const { roomId } = useParams();
  const reactNavigator = useNavigate();
  const [clients, setClients] = useState([]);
  const editorRef = useRef(null);

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on('connect_error', (err) => handleErrors(err));
      socketRef.current.on('connect_failed', (err) => handleErrors(err));

      function handleErrors(e) {
        console.log('socket error', e);
        toast.error('Socket connection failed, try again later.');
        reactNavigator('/');
      }

      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: location.state?.username,
      });

      // Listening for joined event.
      socketRef.current.on(
        ACTIONS.JOINED,
        ({ clients, username, socketId }) => {
          if (username !== location.state?.username) {
            toast.success(`${username} joined the room.`);
            console.log(`${username} joined`);
          }

          // Update the clients list with a unique list of clients using socketId.
          const uniqueClients = clients.filter(
            (client, index, self) =>
              index === self.findIndex(c => c.username === client.username)
          );

          setClients(uniqueClients);
          // For syncing the code from the start.
          socketRef.current.emit(ACTIONS.SYNC_CODE, {
            code: codeRef.current,
            socketId,
          });
        }
      );

      // Listening for disconnected.
      socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
        if (username) {
          toast.success(`${username} left the room`);
          setClients((prevClients) => {
            return prevClients.filter(client => client.socketId !== socketId);
          });
        }
      });
    };

    init();

    // Listener cleaning function.
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current.off(ACTIONS.JOINED);
        socketRef.current.off(ACTIONS.DISCONNECTED);
      }
    };
  }, [location.state?.username, reactNavigator, roomId]);

  // To copy the room id to clipboard.
  async function copyRoomId() {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success('Room ID copied to clipboard');
    } catch (error) {
      toast.error('Failed to copy room ID');
    }
  }

  // For leaving the room.
  function leaveRoom() {
    socketRef.current.emit(ACTIONS.LEAVE_ROOM, {
      roomId,
      username: location.state.username,
    });
    reactNavigator('/');
    setTimeout(() => {
      window.location.reload();
    }, 100);
  }

  // Download the content of the editor to a file.
  function downloadContent() {
    const content = codeRef.current;

    const blob = new Blob([content], { type: 'text/plain' });

    const anchor = document.createElement('a');
    anchor.href = URL.createObjectURL(blob);
    anchor.download = 'my-file.js';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }

  if (!location.state) {
    return <Navigate to="/" />;
  }

  return (
    <div className="main-wrap">
      <div className="aside">
        <div className="aside-inner">
          <div className="logo">
            <img className="logo-image" src="/logo.png" alt="logo" />
          </div>

          <h3>All Participants</h3>

          <div className="client-list">
            {clients.map((client) => (
              <Client key={client.socketId} username={client.username} />
            ))}
          </div>
        </div>

        <button className="btn copy-btn" onClick={copyRoomId}>
          Share ROOM ID
        </button>
        <button className="btn download-btn" onClick={downloadContent}>
          Download
        </button>
        <button className="btn leave-btn" onClick={leaveRoom}>
          Leave
        </button>
      </div>

      <div className="editor-wrap">
        <Editor
          socketRef={socketRef}
          roomId={roomId}
          onCodeChange={(code) => {
            codeRef.current = code;
          }}
          ref={editorRef}
        />
      </div>
    </div>
  );
}

export default EditorPage;
