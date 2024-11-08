'use client';

import { FormEvent, useEffect, useState } from 'react';
import SocketService from '@/app/(main)/chatting/_socketInit/socketService';

export default function ChattingPage() {
  const socketService = SocketService.getInstance();

  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  const onHandleSendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (message.trim()) {
      setMessages((prev) => [...prev, `나: ${message}`]);
      socketService.sendMessage(message);
      setMessage('');
    }
  };

  useEffect(() => {
    socketService.connect();

    socketService.onMessage((newMessage) => {
      setMessages((prev) => [...prev, `상대방: ${newMessage}`]);
    });

    return () => {
      socketService.removeInstance();
    };
  }, []);

  return (
    <>
      <div>
        <div
          className="bg-white"
          style={{
            height: '300px',
            border: '1px solid black',
          }}>
          {messages.map((msg, index) => (
            <div key={index}>{msg}</div>
          ))}
        </div>
      </div>
      <form onSubmit={(e) => onHandleSendMessage(e)}>
        <input
          type="text"
          style={{ border: '1px solid black' }}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button type="submit" className="bg-white text-black" style={{ border: '1px solid black' }}>
          Send
        </button>
      </form>
    </>
  );
}
