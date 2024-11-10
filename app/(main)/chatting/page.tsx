'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import SocketService from '@/app/(main)/chatting/_socketInit/socketService';
import { ChattingMessageListRes } from '@/types/interface';

export default function ChattingPage() {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const socketService = SocketService.getInstance();

  const [messageList, setMessageList] = useState<ChattingMessageListRes[]>([]);
  const [message, setMessage] = useState<string>('');

  const onHandleSendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimMessage = message.trim();

    if (trimMessage.length > 200) {
      return alert('200자 이하로 입력해주세요.');
    }

    if (trimMessage.length === 0) {
      return alert('메시지를 입력해주세요.');
    }

    setMessageList((prev) => [...prev, { message: trimMessage, name: '나', isMine: true }]);
    socketService.sendMessage(trimMessage);
    setMessage('');
  };

  useEffect(() => {
    socketService.connect();

    socketService.onMessage(({ message, name }: { message: string; name: string }) => {
      setMessageList((prev) => [...prev, { message, name, isMine: false }]);
    });

    return () => {
      socketService.removeInstance();
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messageList]);

  return (
    <>
      <div>
        <div
          className="bg-white"
          style={{
            height: '300px',
            maxHeight: '450px',
            overflowY: 'auto',
            border: '1px solid black',
          }}>
          {messageList.map((msg, index) => (
            <div
              key={index}
              className={`${msg.isMine ? 'text-right' : 'text-left'} `}>{`${msg.name}: ${msg.message}`}</div>
          ))}
          <div ref={messagesEndRef} />
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
