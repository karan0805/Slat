import React from 'react';
import { FooterContainer, Copyright, MenuLink } from './Footer.styled';

const Footer = () => {
  return (
    <FooterContainer>
      <Copyright>
        &copy; 2022 Slat, All Rights Reserved.
        <MenuLink to="/"> Imprint</MenuLink>
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;
