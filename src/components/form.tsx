import React, { FC, useState, ChangeEvent, FormEvent } from 'react';
import { useHistory } from 'react-router';

export const Form: FC = () => {
  const [newMessage, setNewMessage] = useState('');
  const history = useHistory();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewMessage(event.target.value);
  };

  const onMessageSubmit = (event: FormEvent<HTMLFormElement>) => {
    history.push(`${newMessage}`);
    event.preventDefault();
  };

  return (
    <div>
      <form onSubmit={onMessageSubmit}>
        <input
          placeholder="тикер"
          type="text"
          value={newMessage}
          onChange={handleChange}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};
