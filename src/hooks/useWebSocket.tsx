import { useEffect, useState } from 'react';

export const useWebSocket = (securityToken: string) => {
  const serverUrl = 'wss://ws.finnhub.io?token=';
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<IMessages | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [subscribe, setSubscribe] = useState<ITransferredData>({
    type: 'subscribe',
  });
  const [unsubscribe, setUnsubscribe] = useState<ITransferredData>({
    type: 'unsubscribe',
  });

  const transferredData = (topic: string) => {
    if (subscribe.symbol === topic) return;
    if (subscribe.symbol) {
      setUnsubscribe({
        ...unsubscribe,
        ...{ symbol: `${subscribe.symbol}` },
      });
    }
    setSubscribe({
      ...subscribe,
      ...{ symbol: `${topic}` },
    });
  };

  useEffect(() => {
    if (!socket && subscribe.symbol) {
      const data = new WebSocket(`${serverUrl}${securityToken}`);

      data.onopen = () => {
        setSocket(data);
      };
    }
    if (!socket) return;

    if (unsubscribe.symbol) {
      socket.send(JSON.stringify(unsubscribe));
    }

    socket.send(JSON.stringify(subscribe));
    setIsConnected(true);

    socket.onmessage = (eventMessages: IEventMessages) => {
      const socketMessage = JSON.parse(eventMessages.data);
      if (!socketMessage.data) return;
      setMessages(socketMessage);
      setIsConnected(false);
    };
  }, [securityToken, serverUrl, socket, subscribe, unsubscribe]);

  return { messages, isConnected, transferredData };
};

interface IMessages {
  data: [
    {
      p: number;
      s: string;
      v: number;
    }
  ];
}

interface ITransferredData {
  type: string;
  symbol?: string;
}

interface IEventMessages {
  data: string;
}
