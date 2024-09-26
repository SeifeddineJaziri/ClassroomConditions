import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaSmile, FaBell, FaSlidersH, FaChalkboardTeacher } from 'react-icons/fa'; // Added FaChalkboardTeacher for the new interface
import styled from 'styled-components';
import SidebarImage from '../assets/jandouba.jpg'; 

const SidebarWrapper = styled.div`
  width: 220px; 
  background-color: #fff;
  padding: 20px;
  height: 100vh;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`;

const SidebarImageStyled = styled.img`
  width: 210px;
  height: 300px;
  border-radius: 20px;
  margin-bottom: 30px;
`;

const SidebarLink = styled(NavLink)`
  display: flex;
  align-items: center;
  color: #000;
  text-decoration: none;
  margin-bottom: 10px;
  padding: 10px;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f0f0f0;
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
  margin: 5px 0;
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
        <span>Sorted conditions</span>
      </SidebarLink>
      <Separator />

      <SidebarLink to="/notifications">
        <IconWrapper><FaBell /></IconWrapper>
        <span>Notifications</span>
      </SidebarLink>
      <Separator />
      
      <SidebarLink to="/threshold-settings">
        <IconWrapper><FaSlidersH /></IconWrapper>
        <span>Range Settings</span>
      </SidebarLink>
      <Separator />

      
      

      <SidebarLink to="/recommended-classrooms">
        <IconWrapper><FaChalkboardTeacher /></IconWrapper>
        <span>Recommended Classrooms</span>
      </SidebarLink>

      <SidebarImageStyled src={SidebarImage} alt="Sidebar Image" />
    </SidebarWrapper>
  );
};

export default Sidebar;
