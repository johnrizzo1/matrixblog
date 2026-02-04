import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const RabbitHole = () => {
    const navigate = useNavigate();
    const [input, setInput] = useState('');
    const [logs, setLogs] = useState([
        "Initializing secure connection...",
        "Bypassing mainframe firewalls...",
        "Accessing Node 23...",
        "Connection established."
    ]);
    const bottomRef = useRef(null);

    // Auto-scroll logic
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [logs]);

    const handleCommand = (e) => {
        if (e.key === 'Enter') {
            const cmd = input.trim();
            setLogs(prev => [...prev, `> ${cmd}`]);
            setInput('');

            if (cmd.toLowerCase() === 'matrix' || cmd.toLowerCase() === 'neo' || cmd.toLowerCase() === 'follow the white rabbit') {
                setLogs(prev => [...prev, "ACCESS GRANTED. Welcome, Operator."]);
                // Here we could redirect to a real admin dashboard or just show a success state
            } else {
                setLogs(prev => [...prev, "ACCESS DENIED. Invalid passkey."]);
            }
        }
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: '#000',
            color: '#0F0',
            fontFamily: 'monospace',
            padding: '2rem',
            overflowY: 'auto',
            zIndex: 9999
        }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <pre style={{ color: '#0F0', textShadow: '0 0 5px #0F0' }}>
                    {`
   /\\   /\\   
  //\\\\_//\\\\  
  \\_     _/  
   / ^ ^ \\   
   \\  O  /   
    \\_-_/    
     _|_     
    |   |    
`}
                </pre>
                <h1 style={{ textShadow: '0 0 10px #0F0' }}>WAKE UP, NEO...</h1>

                <div style={{ margin: '2rem 0', lineHeight: '1.6' }}>
                    {logs.map((log, i) => (
                        <div key={i}>{log}</div>
                    ))}
                    <div ref={bottomRef} />
                </div>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginRight: '10px' }}>&gt;</span>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleCommand}
                        autoFocus
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: '#0F0',
                            fontFamily: 'monospace',
                            fontSize: '1rem',
                            outline: 'none',
                            flex: 1,
                            textShadow: '0 0 5px #0F0'
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default RabbitHole;
