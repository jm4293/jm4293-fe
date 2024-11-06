'use client';

import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4000/chatting', {
  transports: ['websocket'],
  withCredentials: true, // 서버로 쿠키를 포함하여 보냄
});

export default function ChattingForm() {
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  // 서버로부터 받은 메시지를 상태에 추가
  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected to server');
    });

    socket.on('message', (message: string) => {
      setMessages((prev) => [...prev, message]); // 메시지 수신 시 상태 업데이트
    });

    socket.on('disconnect', () => {
      console.log('disconnected from server');
    });

    return () => {
      socket.off('connect');
      socket.off('message');
      socket.off('disconnect');
    };
  }, []);

  const handleSendMessage = () => {
    if (message.trim()) {
      socket.emit('message', message); // 서버로 메시지 전송
      setMessages((prevMessages) => [...prevMessages, message]);
      setMessage(''); // 메시지 입력 필드 초기화
    }
  };

  return (
    <div>
      <div>
        <div
          style={{
            height: '300px',
            overflowY: 'scroll',
            border: '1px solid #ccc',
          }}>
          {messages.map((msg, index) => (
            <div key={index}>{msg}</div>
          ))}
        </div>
      </div>
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type a message" />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
}
