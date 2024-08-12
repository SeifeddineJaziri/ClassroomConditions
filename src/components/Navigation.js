import React from 'react';
import styled from 'styled-components';
import logo1 from '../assets/logo.jpg'; 
import logo2 from '../assets/logoAizu.jpg'; 

const NavWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  height: 50px; /* Adjust the height to make the logo bigger */
  width: auto;
  margin: 0 20px; /* Adjust left and right margins */
`;

const Navigation = () => {
  return (
    <NavWrapper>
      <LogoWrapper>
        <Logo src={logo2} alt="Logo 2" /> 
      </LogoWrapper>
      <LogoWrapper style={{ marginLeft: 'auto' }}>
        <Logo src={logo1} alt="Logo 1" /> 
        </LogoWrapper>
    </NavWrapper>
  );
};

export default Navigation;
