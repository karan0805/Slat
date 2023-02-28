import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`


*{
    margin: 0;
    padding: 0;
    box-sizing: inherit;
}

html {
    box-sizing: border-box;
    font-size: 62.5%;

    @media only screen and (max-width: 1200px){
        font-size: 58%;
    }
    @media only screen and (min-width: 1980px){
        font-size: 70%;
    }
}
body{
    font-family: 'Nunito', sans-serif;
    font-weight: 400;
    line-height: 1.6;
    font-size: 1.6rem;
    background: #F9F9F9;
    color: #333;

}
`;

export default GlobalStyles;

export const Container = styled.div`
  margin: 0 auto;
  padding: 0 100px;
  max-width: 1400px;
  width: 100%;

  @media (max-width: 400px) {
    padding: 0 10px;
  }
  @media (max-width: 991px) {
    padding: 0 30px;
  }

  @media (min-width: 1500px) {
    max-width: 1500px;
  }

  @media (min-width: 1800px) {
    max-width: 1800px;
    padding: 0 30px;
  }
`;

export const Button = styled.button`
  border-radius: ${({ bigRadius }) => (bigRadius ? '30px' : '50px')};
  background: linear-gradient(91.76deg, #18c3e6 4.94%, #a1e690 94.92%);
  color: ${({ primary }) => (primary ? '#000' : '#000')};
  padding: ${({ big }) => (big ? '18px 30px' : '10px 28px')};
  font-size: ${({ bigFont }) => (bigFont ? '32px' : '16px')};
  outline: none;
  cursor: pointer;
  border: 2px white solid;
  transition: all 0.5s ease;
  font-weight: 500;

  &:hover {
    transform: translateY(-3px);
    background-color: ${({ primary }) => (primary ? '#6A67CE' : '#ffb923')};
    color: #fff;
  }
  &:active {
    transform: translateY(0.5rem);
  }

  @media only screen and (max-width: 1000px) {
    /* width: 100%; */
    padding: ${({ big }) => (big ? '18px 30px' : '10px 20px')};
  }
  @media only screen and (max-width: 375px) {
    padding: ${({ big }) => (big ? '12px 20px' : '10px 20px')};
    font-size: ${({ bigFont }) => (bigFont ? '16px' : '10px')};
  }
`;

export const OutlineButton = styled.button`
  border-radius: ${({ bigRadius }) => (bigRadius ? '30px' : '50px')};
  border: 2px white solid;
  color: white;
  outline: none;
  padding: ${({ big }) => (big ? '18px 30px' : '10px 28px')};
  font-size: ${({ bigFont }) => (bigFont ? '32px' : '16px')};
  transition: all 0.5s ease;
  background-color: transparent;
  text-align: center;
  font-weight: 500;

  &:hover {
    transform: translateY(-3px);
    background-color: transparent;
    color: #fff;
  }

  @media only screen and (max-width: 1000px) {
    /* width: 100%; */
    padding: ${({ big }) => (big ? '18px 30px' : '10px 20px')};
  }
  @media only screen and (max-width: 375px) {
    padding: ${({ big }) => (big ? '12px 20px' : '10px 20px')};
    font-size: ${({ bigFont }) => (bigFont ? '16px' : '10px')};
  }
`;
