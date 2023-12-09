// Import all required modules.
import React from 'react';
import Avatar from 'react-avatar';

/**
 * Render the client component.
 *
 * @param {string} username - The username of the client.
 * @returns {JSX.Element} - The rendered client component.
 */
const Client = ({ username }) => {
    return (
        <>
            <div className="client">
                <Avatar name={username} size={55} round="14px" />
                <span className="user-name">{username}</span>
            </div>
        </>
    )
}

export default Client;