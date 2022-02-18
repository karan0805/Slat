import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Container } from '../../styles/Globalstyles';

export const Nav = styled.nav`
  padding-left: 80px;
  padding-top: 20px;
  position: fixed;
  top: 0;
  width: 100%;
  height: 80px;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NavbarContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  padding-right: 120px;
  ${Container};
`;

export const NavLogo = styled(Link)`
  color: #ffffff;
  cursor: pointer;
  display: flex;
  align-items: center;
  text-decoration: none;
  font-size: 2rem;
  font-weight: 500;
  transition: all 0.5s ease;
  max-width: 50px;
  margin-right: 10px;
  &:hover {
    transform: scale(1.08);
  }
`;

export const MenuIcon = styled.div`
  display: none;

  @media (max-width: 1000px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-50%, 20%);
    font-size: 4rem;
    cursor: pointer;
  }
`;

export const Menu = styled.ul`
  display: flex;
  align-items: center;
  text-align: center;

  @media only screen and (max-width: 1000px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 80px;
    left: ${({ click }) => (click ? '0' : '-100%')};
    background-color: rgba(0, 0, 0, 0.9);
    transition: all 0.5s ease;
  }
`;

export const MenuItem = styled.li`
  list-style: none;

  @media only screen and (max-width: 1000px) {
    width: 100%;
    &:hover {
      border: none;
    }
  }
`;

export const MenuLink = styled(Link)`
  text-decoration: none;
  font-weight: 500;
  font-size: 1.5rem;
  color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  height: 100%;
  transition: all 0.2s ease;

  &:hover {
    color: #6a67ce;
    background-image: repeating-linear-gradient(
      45deg,
      rgb(60, 129, 246),
      rgb(157, 85, 255) 20%,
      rgb(131, 58, 180) 40%,
      rgb(193, 53, 132) 60%,
      rgb(225, 48, 108) 80%,
      rgb(253, 29, 29)
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    transform: traslateY(-3rem);
  }
  &:active {
    transform: traslateY(3rem);
    color: #6a67ce;
  }

  @media only screen and (max-width: 1000px) {
    display: block;
    padding: 3rem;
    text-align: center;
    transition: all 0.2s ease;
  }
`;

export const MenuItemBtn = styled.li`
  list-style: none;
  @media screen and (max-width: 1000px) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    height: 120px;
  }
`;

export const MenuLinkBtn = styled(Link)`
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  height: 100%;
  width: 100%;
  border: none;
  outline: none;
`;
