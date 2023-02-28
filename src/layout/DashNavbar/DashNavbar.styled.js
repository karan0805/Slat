import styled from 'styled-components';
import { Container } from '../../styles/Globalstyles';

export const Nav = styled.nav`
  font-size: 18px;
  position: sticky;
  top: 0;
  z-index: 9;
  height: 89px;
  background-color: rgba(0, 0, 0, 0);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NavbarContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  height: 89px;
  padding: 0 40px;

  ${Container};
`;
