import React, { FC, useState, ChangeEvent, FormEvent } from 'react';
import { useHistory } from 'react-router';

import styled from 'styled-components';
import loupe from './img/loupe.svg';

const Form = styled.form`
  display: flex;
`;

const SearchText = styled.input`
  width: 400px;
  height: 16px;
  border-radius: 18px;
  padding: 8px;
  background-color: #1a2e3d;
  border: 2px solid #4e6479;
  caret-color: #ffb92e;
  color: #c6d3dc;
  cursor: text;
  font-size: 16px;
  &:focus {
    outline: 0;
    border: 2px solid #74d69f;
    caret-color: #74d69f;
  }
  &::placeholder {
    color: #4e6479;
  }
`;

const SearchButton = styled.button`
  position: relative;
  border: none;
  padding: 0;
  outline: none;
  cursor: pointer;
  &::after {
    content: '';
    display: inline-block;
    position: absolute;
    width: 36px;
    height: 36px;
    right: 0;
    top: 0;
    background: url(${loupe}) no-repeat center;
    opacity: 0.5;
    transition: opacity 0.1s ease-out;
  }
`;

export const FormControl: FC = () => {
  const [newMessage, setNewMessage] = useState('');
  const history = useHistory();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewMessage(event.target.value);
  };

  const onMessageSubmit = (event: FormEvent<HTMLFormElement>) => {
    history.push(`/companies/${newMessage}`);
    event.preventDefault();
  };

  return (
    <>
      <Form onSubmit={onMessageSubmit}>
        <SearchText
          placeholder="тикер, например 'AAPL'"
          type="text"
          value={newMessage}
          onChange={handleChange}
        />
        <SearchButton type="submit" />
      </Form>
    </>
  );
};
