import io, { Socket } from 'socket.io-client';

export default class SocketService {
  private static _instance: SocketService | null = null;
  private _socket: Socket | null = null;

  private constructor() {}

  public static getInstance(): SocketService {
    if (!SocketService._instance) {
      SocketService._instance = new SocketService();
    }
    return SocketService._instance;
  }

  connect() {
    if (!this._socket) {
      this._socket = io(`${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_SOCKET_PORT}/socket/chatting`, {
        transports: ['websocket'],
        withCredentials: true,
      });

      this._socket.on('connect', () => {
        console.log('Socket connected');
      });

      this._socket.on('connect_error', (error) => {
        console.error('Connection error:', error);
      });
    }
  }

  onMessage(callback: (message: string) => void) {
    if (this._socket) {
      this._socket.on('message', callback);
    }
  }

  sendMessage(message: string) {
    if (this._socket && this._socket.connected) {
      this._socket.emit('message', message);
    } else {
      console.error('Socket not connected');
    }
  }

  disconnect() {
    if (this._socket) {
      this._socket.disconnect();
      console.log('Socket disconnected');
    }
  }
}
