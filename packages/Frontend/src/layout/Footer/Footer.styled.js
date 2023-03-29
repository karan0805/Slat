import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const FooterContainer = styled.div`
  margin-top: auto;
  width: 100%;
  height: 52px;
  background: #222;
`;

export const Copyright = styled.div`
  border-top: 1px solid #111;
  font-size: 14px;
  color: #ccc;
  padding-top: 15px;
  text-align: center;
  padding-bottom: 15px;
  max-height: 52px;
  background: #222;
`;

export const MenuLink = styled(Link)`
  text-decoration: none;
  font-weight: bold;
  transition: all 0.2s ease;
  color: #ccc;

  &:hover {
    color: #6a67ce;
    transform: traslateY(-3rem);
  }
  &:active {
    transform: traslateY(3rem);
    color: #6a67ce;
  }
`;
