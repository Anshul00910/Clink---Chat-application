import './App.css';
import io from 'socket.io-client';
import { nanoid } from 'nanoid';
import { useState, useEffect } from 'react';

const socket = io('http://localhost:3000');
const userName = nanoid(4);  // Generate a unique user ID for each client

function App() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  const sendChat = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    socket.emit("chat", { message, userName });
    setMessage('');
  };

  useEffect(() => {
    const handleIncoming = (msg) => {
      setChat((prevChat) => [...prevChat, msg]);
    };

    socket.on("chat", handleIncoming);

    // Clean up listener on unmount
    return () => {
      socket.off("chat", handleIncoming);
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Clink App</h1>

        <div style={{ marginBottom: '1rem' }}>
          {chat.map((msg, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                justifyContent: msg.userName === userName ? 'flex-end' : 'flex-start',
                marginBottom: '8px',
                marginLeft: msg.userName === userName ? 'auto' : '0',
                marginRight: msg.userName === userName ? '0' : 'auto',
              }}
            >
              <div
                style={{
                  backgroundColor: msg.userName === userName ? 'purple' : 'orange',
                  color: 'white',
                  padding: '12px 16px',
                  borderRadius: '20px',
                  maxWidth: '60%',
                  wordWrap: 'break-word',
                  boxShadow: '2px 2px 10px rgba(0,0,0,0.1)',
                }}
              >
                <p style={{ margin: 0 }}>{msg.message}</p>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={sendChat}>
          <input
            type="text"
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </header>
    </div>
  );
}

export default App;
