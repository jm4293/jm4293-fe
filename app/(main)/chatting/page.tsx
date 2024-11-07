'use client';

import { useEffect, useState } from 'react';
import SocketService from '@/app/(main)/chatting/_socketInit/socketService';
import { usePathname } from 'next/navigation';

export default function ChattingPage() {
  const pathName = usePathname();
  const socketService = SocketService.getInstance();

  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  const onHandleSendMessage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (message.trim()) {
      // 메시지를 보낼 때 상태에 추가
      setMessages((prev) => [...prev, `나: ${message}`]);
      socketService.sendMessage(message);
      setMessage('');
    }
  };

  useEffect(() => {
    // 소켓 연결
    socketService.connect();

    // 메시지 수신 시 상태 업데이트
    socketService.onMessage((newMessage) => {
      setMessages((prev) => [...prev, `상대방: ${newMessage}`]);
    });

    // // 컴포넌트 언마운트 시 소켓 연결 해제
    // return () => {
    //   socketService.disconnect();
    // };
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
      <input
        type="text"
        style={{ border: '1px solid black' }}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button
        className="bg-white text-black"
        style={{ border: '1px solid black' }}
        onClick={(e) => onHandleSendMessage(e)}>
        Send
      </button>
    </>
  );
}
