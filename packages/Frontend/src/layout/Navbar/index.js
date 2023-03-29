import React, { useEffect, useState } from 'react';
import { IconContext } from 'react-icons';
import { BiMenu, BiX } from 'react-icons/bi';
import { ImCross } from 'react-icons/im';
import logo from './../../assets/svgs/logo.svg';
import { Button } from '../../styles/Globalstyles';
import {
  Menu,
  MenuIcon,
  MenuItem,
  MenuItemBtn,
  MenuLink,
  MenuLinkBtn,
  Nav,
  NavBanner,
  NavbarContainer,
  NavLogo,
} from './Navbar.styled';
import { Text } from '@mantine/core';
import { useToggle } from '@mantine/hooks';

const Navbar = () => {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [banner, setBanner] = useState(true);
  const [bannertext, toggle] = useToggle(
    'Banner for Announcements and Marketing',
    ['Banner for Announcements and Marketing', ' Sponsor our Project 🚀'],
  );

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
    setTimeout(() => {
      toggle();
    }, 5000);
  }, [toggle]);
  window.addEventListener('resize', showButton);

  return (
    <>
      <IconContext.Provider value={{ color: '#ffffff' }}>
        {banner && (
          <NavBanner>
            {bannertext}
            <ImCross
              style={{ position: 'absolute', right: '40px', height: '24px' }}
              onClick={() => setBanner(false)}
            />
          </NavBanner>
        )}
        <Nav>
          <NavbarContainer>
            <NavLogo to="/">
              <img
                style={{ maxWidth: '45px', marginRight: '10px' }}
                src={logo}
                alt="slat"
              />
              <Text color={'white'} style={{ fontSize: '28px' }}>
                SLAT
              </Text>
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
              {/* <MenuItem>
                <MenuLink onClick={closeMenu} to="/auth/login">
                  Login
                </MenuLink>
              </MenuItem> */}
              <MenuItemBtn>
                {button ? (
                  <MenuLinkBtn to="/auth/signup">
                    <Button primary>Try Now</Button>
                  </MenuLinkBtn>
                ) : (
                  <MenuLinkBtn to="/auth/signup">
                    <Button primary onClick={closeMenu}>
                      Early Sign up
                    </Button>
                  </MenuLinkBtn>
                )}
              </MenuItemBtn>
            </Menu>
          </NavbarContainer>
        </Nav>
      </IconContext.Provider>
    </>
  );
};

export default Navbar;
