import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Container } from '../../styles/Globalstyles';

export const Nav = styled.nav`
  width: 100%;
  height: 81px;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NavBanner = styled.div`
  background: linear-gradient(91.76deg, #18c3e6 4.94%, #a1e690 94.92%);
  color: white;
  text-align: center;
  font-weight: 600;
  position: relative;
  width: 100%;
  padding: 5px 0;
`;

export const NavbarContainer = styled(Container)`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  ${Container};
`;

export const NavLogo = styled(Link)`
  color: #ffffff;
  cursor: pointer;
  display: flex;
  align-items: center;
  text-decoration: none;
  font-size: 1.25rem;
  font-weight: 500;
  transition: all 0.5s ease;
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
    font-size: 3rem;
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
    justify-content: space-between;
    width: 100%;
    position: absolute;
    height: 540px;
    top: 80px;
    margin: 0px;
    padding: 0px;
    left: ${({ click }) => (click ? '0px' : '-100vw')};
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
  font-size: 1.1rem;
  color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 32px;
  height: 100%;
  transition: all 0.2s ease;

  &:hover {
    color: #6a67ce;
    background-image: repeating-linear-gradient(
      91.76deg,
      #18c3e6 4.94%,
      #a1e690 94.92%
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
    padding: 1.5rem;
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

export const DropDownContent = styled.div`
  display: none;
  position: absolute;
  background-color: #000000;
  color: white;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;

  @media screen and (max-width: 1000px) {
    background-color: rgba(0, 0, 0, 0.9);
    width: 100%;
  }
`;

export const DropDownLi = styled(MenuItemBtn)`
  display: inline-block;

  &:hover ${DropDownContent} {
    display: block;
  }

  @media screen and (max-width: 1000px) {
    height: 80px;
    width: 100%;
  }
`;

export const Dropbtn = styled.div`
  text-decoration: none;
  font-weight: 500;
  font-size: 1.1rem;
  color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 32px;
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

  @media only screen and (max-width: 1000px) {
    display: block;
    color: white;
    padding: 3rem;
    text-align: center;
    transition: all 0.2s ease;
  }
`;
