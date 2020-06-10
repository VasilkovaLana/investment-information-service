import React, { FC, useState, ChangeEvent, FormEvent } from 'react';
import { useWebSocket } from '../hooks/useWebSocket';

export const Form: FC = () => {
  const securityToken = 'br8guuvrh5ral083gk80';
  const [newMessage, setNewMessage] = useState('');
  const { messages, isConnected, transferredData } = useWebSocket(
    securityToken
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewMessage(event.target.value);
  };

  const onMessageSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    transferredData(newMessage);
  };

  if (isConnected) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={onMessageSubmit}>
      <input type="text" value={newMessage} onChange={handleChange} />
      <button type="submit">Send</button>
      <p>Ticker: {messages && messages.data[0].s}</p>
      <p>Last price: {messages && messages.data[0].p} </p>
      <p>Volume: {messages && messages.data[0].v}</p>
    </form>
  );
};
