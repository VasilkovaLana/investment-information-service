import React from 'react';
import { FormControl } from '../form-control/formControl';
import { Link, NavLink } from 'react-router-dom';

import styled from 'styled-components';
import logo from './img/logo.png';

const NavBar = styled.nav`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 8px 0;
  margin-bottom: 16px;
`;

const NavBarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 970px;
  height: 38px;
  color: red;
`;

const LinkHome = styled(Link)`
  display: flex;
  margin-right: 16px;
`;

const NavLinkStyle = styled(NavLink)`
  padding-left: 16px;
  text-decoration: none;
  color: #fff;
  &.active {
    font-weight: bold;
    color: #8dd8ff;
  }
`;

const Logo = styled.img`
  height: 36px;
`;

export const TopBar = () => {
  return (
    <NavBar>
      <NavBarWrapper>
        <LinkHome to="/">
          <Logo alt="home" src={logo} />
        </LinkHome>
        <FormControl />
        <NavLinkStyle to="/news">NEWS</NavLinkStyle>
      </NavBarWrapper>
    </NavBar>
  );
};
