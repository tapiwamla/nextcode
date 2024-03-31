import { React, Avatar } from '../imports';

const Client = ({ username }) => {
    return (
        <>
            <div className="client">
                <Avatar name={username} size={55} round="14px" />
                <span className="username">{username}</span>
            </div>
        </>
    )
}

export default Client;
