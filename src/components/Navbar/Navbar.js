import React, { useEffect, useState } from 'react';
import { IconContext } from 'react-icons';
import { BiMenu, BiX } from 'react-icons/bi';
import { Button } from '../../styles/Globalstyles';
import logo from './../../assets/images/logo.svg';
import {
  Menu,
  MenuIcon,
  MenuItem,
  MenuItemBtn,
  MenuLink,
  MenuLinkBtn,
  Nav,
  NavbarContainer,
  NavLogo,
} from './Navbar.styled';

const Navbar = () => {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const handleClick = () => setClick(!click);
  const closeMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 1000) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);
  window.addEventListener('resize', showButton);

  return (
    <div>
      <IconContext.Provider value={{ color: '#000' }}>
        <Nav>
          <NavbarContainer>
            <NavLogo to="/">
              <img
                style={{ maxWidth: '50px', marginRight: '10px' }}
                src={logo}
                alt="slat"
              />
              Slat
            </NavLogo>
            <MenuIcon onClick={handleClick}>
              {click ? <BiX /> : <BiMenu />}
            </MenuIcon>

            <Menu onClick={handleClick} click={click}>
              <MenuItem>
                <MenuLink onClick={closeMenu} to="/">
                  Why Slat?
                </MenuLink>
              </MenuItem>
              <MenuItem>
                <MenuLink onClick={closeMenu} to="/">
                  Features
                </MenuLink>
              </MenuItem>
              <MenuItem>
                <MenuLink onClick={closeMenu} to="/auth/login">
                  Login
                </MenuLink>
              </MenuItem>
              <MenuItemBtn>
                {button ? (
                  <MenuLinkBtn to="/auth/signup">
                    <Button primary>Get Started</Button>
                  </MenuLinkBtn>
                ) : (
                  <MenuLinkBtn to="/auth/signup">
                    <Button primary bigFont onClick={closeMenu}>
                      Get Started
                    </Button>
                  </MenuLinkBtn>
                )}
              </MenuItemBtn>
            </Menu>
          </NavbarContainer>
        </Nav>
      </IconContext.Provider>
    </div>
  );
};

export default Navbar;
