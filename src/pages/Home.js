import React, { useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Home() {

    const navigate = useNavigate();

    const [ roomId, setRoomId ] = useState('');
    const [ username, setUsername ] = useState('');

    const createNewRoom = (e) => {
        e.preventDefault();
        const id = uuidV4();
        setRoomId(id);
        toast.success("Created a new room");
    };

    const joinRoom = () => {
        if (!roomId || !username) {
            toast.error("Room ID & username is required!");
            return;
        }

        // redirect
        navigate(`/editor/${roomId}`, {
            state: {
                username
            },
        });
    };

    const handleInputEnter = (e) => {
        if (e.code === "Enter") {
            joinRoom();
        }
    };

    return (
        <div className="homepage-wrapper">

            <div className="form-wrapper">
                <img className="homepage-logo" src="/logo.png" alt="code-sync-logo" />
                <h4 className="main-label">Enter Room ID and pick a username</h4>

                <div className="input-group">
                    <input
                        type="text"
                        className="input-box"
                        placeholder="ROOM ID"
                        onChange={(e) => { setRoomId(e.target.value) }}
                        value={roomId}
                        onKeyUp={handleInputEnter}
                    />

                    <input
                        type="text"
                        className="input-box"
                        placeholder="USERNAME"
                        onChange={(e) => { setUsername(e.target.value) }}
                        value={username}
                        onKeyUp={handleInputEnter}
                    />

                    <button className="btn enter-btn" onClick={joinRoom}>ENTER</button>

                    <span className="create-info">New meeting? &nbsp;
                        <a
                            onClick={createNewRoom}
                            href="google.com"
                            className="create-new-btn">CLICK HERE
                        </a>
                        &nbsp; to create a new room.
                    </span>
                </div>
            </div>


            <footer>
                <p><a href="https://github.com/tapiwamla" target='_blank' rel="noreferrer">tapiwamla</a> developed this</p>
            </footer>

        </div>
    )
}

export default Home;