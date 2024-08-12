import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaSmile, FaFrown } from 'react-icons/fa';
import styled from 'styled-components';
import SidebarImage from '../assets/jandouba.jpg'; 
import SidebarImage2 from '../assets/kahla w zarka.png'; // Replace with your second image path

const SidebarWrapper = styled.div`
  width: 220px; /* Adjusted width */
  background-color: #fff;
  padding: 20px;
  height: 100vh;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`;

const SidebarImageStyled = styled.img`
  width: 210px; /* Set width */
  height: 300px; /* Set height */
  border-radius: 20px; /* Add border radius */
  margin-bot: 50px; /* Move the image to the bottom */
  margin-bottom: 30px; /* Adjusted margin from the bottom */
`;

const SidebarImageStyled2 = styled.img`
  width: 244px; /* Set width */
  height: 29px; /* Set height */
  margin-right: 500px; /* Move the image to the left */
`;

const SidebarLink = styled(NavLink)`
  display: flex;
  align-items: center;
  color: #000;
  text-decoration: none;
  margin-bottom: 10px;
  padding: 10px;
  font-size: 16px;
  transition: background-color 0.3s ease; /* Smooth transition for background color */

  &:hover {
    background-color: #f0f0f0; /* Gray background color on hover */
  }

  &.active {
    font-weight: bold;
    color: #007bff;
  }
`;

const IconWrapper = styled.div`
  margin-right: 10px;
`;

const Separator = styled.hr`
  border-top: 1px solid #ccc;
`;

const Sidebar = () => {
  return (
    <SidebarWrapper>
      <SidebarLink to="/" exact>
        <IconWrapper><FaHome /></IconWrapper>
        <span>Home</span>
      </SidebarLink>
      <Separator />
      <SidebarLink to="/good-conditions">
        <IconWrapper><FaSmile /></IconWrapper>
        <span>Good conditions</span>
      </SidebarLink>
      <Separator />
      <SidebarLink to="/bad-conditions">
        <IconWrapper><FaFrown /></IconWrapper>
        <span>Bad conditions</span>
      </SidebarLink>
      <SidebarImageStyled src={SidebarImage} alt="Sidebar Image" />
      <SidebarImageStyled2 src={SidebarImage2} alt="Second Sidebar Image" />
    </SidebarWrapper>
  );
};

export default Sidebar;
