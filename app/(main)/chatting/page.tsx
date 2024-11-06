'use client';
import { FetchConfig } from '@/commons/fetch-config/fetch-config';
import { UserInfoRes } from '@/types/interface';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4000/chatting', {
  transports: ['websocket'],
  withCredentials: true, // 서버로 쿠키를 포함하여 보냄
});

export default function ChattingPage() {
  const [userInfo, setUserInfo] = useState<UserInfoRes | null>(null);

  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      // socket.emit('message', message);
      socket.emit('message', { messages, userSeq: userInfo?.userSeq });
      // setMessages((prevMessages) => [...prevMessages, message]);
      setMessage(''); // 메시지 입력 필드 초기화
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('/api/user-info', { method: 'GET' });
        const data: { data: UserInfoRes } = await response.json();

        setUserInfo({ name: data.data.name, email: data.data.email, userSeq: data.data.userSeq });

        socket.on('connect', () => {
          console.log('connected to server');

          // if (userInfo?.userSeq) {
          socket.emit('set-user', data.data.userSeq); // userSeq를 서버에 보냄
          // }
        });

        socket.on('message', (message: string) => {
          setMessages((prev) => [...prev, message]); // 메시지 수신 시 상태 업데이트
        });

        socket.on('disconnect', () => {
          console.log('disconnected from server');
        });
      } catch (error) {
        console.error('API 호출 중 에러 발생', error);
      }
    })();

    // return () => {
    //   alert('socket.off()');
    // console.log('socket.off()');
    // socket.off('connect');
    // socket.off('message');
    // socket.off('disconnect');
    // socket.off();
    // socket.disconnect();
    // };
  }, []);

  // console.log('userInfouserInfo', userInfo);

  return (
    <div>
      <div>채팅</div>
      {/*<ChattingForm />*/}

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
      <input
        type="text"
        style={{ border: '1px solid black' }}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button className="text-black" style={{ border: '1px solid black' }} onClick={handleSendMessage}>
        Send
      </button>
    </div>
  );
}
