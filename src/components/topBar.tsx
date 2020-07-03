import React from 'react';
import { Form } from './form';
import { Link, NavLink } from 'react-router-dom';

export const TopBar = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Form />
      <NavLink to="/news">News</NavLink>
    </nav>
  );
};
