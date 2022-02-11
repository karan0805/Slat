import styled from 'styled-components';
import { Container } from '../../styles/Globalstyles';

export const Nav = styled.nav`
  font-size: 18px;
  position: sticky;
  top: 0;
  z-index: 999;
  height: 89px;
  background-color: rgba(0, 0, 0, 0);
  /* box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.5); */
  //-shadow: 0px 2px 10px rgba(0, 0, 0, 0.15);
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

  ${Container};
`;
