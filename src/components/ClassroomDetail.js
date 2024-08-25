import React from 'react';
import styled from 'styled-components';
import { FaTint, FaVolumeUp, FaSun, FaTemperatureHigh } from 'react-icons/fa';
import { MdOutlineAccessTimeFilled, MdDateRange } from 'react-icons/md';
import { useNavigate, useLocation } from 'react-router-dom';

const DetailContainer = styled.div`
  background-color: #f8f9fa; /* Light gray background */
  border-radius: 0.375rem; /* Rounded corners */
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075); /* Light shadow */
  padding: 1.5rem; /* Padding around the content */
  max-width: 800px;
  margin: 2rem auto; /* Centered horizontally with margin */
  display: flex;
  flex-direction: column;
  align-items: center; /* Center items horizontally */
  transition: box-shadow 0.3s ease; /* Smooth transition for box shadow */

  &:hover {
    box-shadow: 0 0 1rem rgba(0, 0, 255, 0.3); /* Blue shadow on hover */
  }
`;

const Header = styled.h1`
  color: #212529; /* Dark text color */
  margin-bottom: 1.5rem; /* Space below the header */
  font-size: 1.5rem; /* Font size for the header */
`;

const InfoSection = styled.div`
  margin-bottom: 1.5rem; /* Space below the info section */
  text-align: center; /* Center align the text */
`;

const InfoTitle = styled.h2`
  font-size: 1.25rem; /* Font size for the info title */
  color: #212529; /* Dark text color */
  margin-bottom: 1rem; /* Space below the title */
`;

const InfoItem = styled.p`
  display: flex;
  align-items: center;
  justify-content: center; /* Center align the content horizontally */
  margin: 0.5rem 0; /* Space between items */
  font-size: 1rem; /* Font size for the info items */
  transition: box-shadow 0.3s ease; /* Smooth transition for box shadow */

  &:hover {
    box-shadow: 0 0 0.5rem rgba(0, 0, 255, 0.3); /* Blue shadow on hover */
  }
`;

const IconWrapper = styled.span`
  margin-right: 0.75rem; /* Space between icon and text */
  color: #dc3545; /* Red color for the icons */
  font-size: 1.25rem; /* Font size for the icons */
`;

const BackButton = styled.button`
  background-color: #007bff; /* Primary color */
  color: #fff;
  border: none;
  border-radius: 0.375rem; /* Rounded corners */
  padding: 0.75rem 1.5rem; /* Padding for the button */
  cursor: pointer;
  font-size: 1rem; /* Font size for the button text */
  transition: background-color 0.3s ease;
  width: 100%; /* Full width button */
  max-width: 200px; /* Max width to avoid too wide button */
  margin-top: 1rem; /* Space above the button */
  
  &:hover {
    background-color: #0056b3; /* Darker blue on hover */
  }
`;

const ClassroomDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const classroom = location.state?.classroom || {};

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <DetailContainer>
      <Header>Classroom {classroom.number} Details</Header>
      <InfoSection>
        <InfoTitle>Classroom Information</InfoTitle>
        <InfoItem>
          <IconWrapper><FaTint /></IconWrapper>
          Humidity: {classroom.humidity}%
        </InfoItem>
        <InfoItem>
          <IconWrapper><FaVolumeUp /></IconWrapper>
          Noise Level: {classroom.noise} dB
        </InfoItem>
        <InfoItem>
          <IconWrapper><FaSun /></IconWrapper>
          Luminance Level: {classroom.luminance} lux
        </InfoItem>
        <InfoItem>
          <IconWrapper><FaTemperatureHigh /></IconWrapper>
          Temperature: {classroom.temperature}°C
        </InfoItem>
        <InfoItem>
          <IconWrapper><MdOutlineAccessTimeFilled /></IconWrapper>
          Time: {classroom.time}
        </InfoItem>
        <InfoItem>
          <IconWrapper><MdDateRange /></IconWrapper>
          Date: {classroom.date}
        </InfoItem>
      </InfoSection>
      <BackButton onClick={handleBack}>Back</BackButton>
    </DetailContainer>
  );
};

export default ClassroomDetail;
