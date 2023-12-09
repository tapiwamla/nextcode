// Import all required modules
import React, { useEffect, useRef } from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import ACTIONS from '../user-actions/Actions';

/**
 * Editor component for real-time code editing.
 * @param {Object} props - The component props.
 * @param {Object} props.socketRef - The socket reference for real-time communication.
 * @param {string} props.roomId - The ID of the room where the code is being edited.
 * @param {Function} props.onCodeChange - The callback function to handle code changes.
 * @returns {JSX.Element} - The editor component.
 */
function Editor({ socketRef, roomId, onCodeChange }) {
    const editorRef = useRef(null);

    useEffect(() => {
        // Initialize CodeMirror instance
        const textarea = document.getElementById('realtimeEditor');
        editorRef.current = CodeMirror.fromTextArea(textarea, {
            mode: 'javascript',
            theme: 'dracula',
            autoCloseTags: true,
            autoCloseBrackets: true,
            lineNumbers: true,
        });

        // Handle local code changes and emit to other clients
        const handleCodeChange = (instance, changes) => {
            const { origin } = changes;
            const code = instance.getValue();

            onCodeChange(code);

            // Emit the code change to other clients in the same room
            if (origin !== 'setValue' && socketRef.current) {
                socketRef.current.emit(ACTIONS.CODE_CHANGE, {
                    roomId,
                    code,
                });
            }
        };

        editorRef.current.on('change', handleCodeChange);

        return () => {
            editorRef.current.off('change', handleCodeChange);
            editorRef.current.toTextArea(); // Clean up the CodeMirror instance
        };
    }, []);

    useEffect(() => {
        // Listen for code changes from other clients
        if (socketRef.current) {
            socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
                if (code !== null) {
                    editorRef.current.setValue(code);
                }
            });
        }

        return () => {
            if (socketRef.current) {
                socketRef.current.off(ACTIONS.CODE_CHANGE);
            }
        };
    }, [ socketRef.current ]);

    return <textarea id="realtimeEditor"></textarea>;
}

export default Editor;