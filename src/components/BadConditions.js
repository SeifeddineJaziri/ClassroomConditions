import React, { useState } from 'react';
import styled from 'styled-components';
import { FaTint, FaVolumeUp, FaSun, FaTemperatureHigh, FaFrown } from 'react-icons/fa'; // Importing icons from react-icons/fa

// Example data for six classrooms in bad conditions
const classroomsData = [
  { number: 201, humidity: 75, noise: 60, luminance: 200, temperature: 28 },
  { number: 202, humidity: 80, noise: 65, luminance: 180, temperature: 27 },
  { number: 203, humidity: 70, noise: 62, luminance: 220, temperature: 29 },
  { number: 204, humidity: 78, noise: 58, luminance: 210, temperature: 26 },
  { number: 205, humidity: 82, noise: 61, luminance: 190, temperature: 28 },
  { number: 206, humidity: 68, noise: 59, luminance: 215, temperature: 27 },
];

const CardContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 20px;
  flex-wrap: wrap;
`;

const Card = styled.div`
  background-color: #ffffff;
  color: #60707E; /* Font color */
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 250px;
  margin: 10px;
`;

const Title = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const IconWrapper = styled.span`
  margin-right: 10px;
`;

const HumidityIcon = styled(FaTint)`
  color: ${({ bad }) => bad ? '#e74c3c' : '#3498db'}; /* Red color for bad conditions */
`;

const NoiseIcon = styled(FaVolumeUp)`
  color: ${({ bad }) => bad ? '#e74c3c' : '#e74c3c'}; /* Red color for bad conditions */
`;

const LuminanceIcon = styled(FaSun)`
  color: ${({ bad }) => bad ? '#e74c3c' : '#f39c12'}; /* Red color for bad conditions */
`;

const TemperatureIcon = styled(FaTemperatureHigh)`
  color: ${({ bad }) => bad ? '#e74c3c' : '#2ecc71'}; /* Red color for bad conditions */
`;

const FrownIcon = styled(FaFrown)`
  color: #e74c3c; /* Red color */
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center; /* Center the buttons horizontally */
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff; /* Blue primary color */
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 10px; /* Add margin for spacing */
`;

const BadConditions = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const handleNextClick = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex === classroomsData.length - 1 ? 0 : prevIndex + 1));
  };

  const handlePreviousClick = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex === 0 ? classroomsData.length - 1 : prevIndex - 1));
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Bad Conditions</h1>
      <CardContainer>
        {classroomsData.map((classroom, index) => (
          <Card key={index}>
            <Title>
              <IconWrapper><LuminanceIcon bad /></IconWrapper>
              <IconWrapper><FrownIcon /></IconWrapper>
              Classroom {classroom.number}
            </Title>
            <p>
              <IconWrapper><HumidityIcon bad /></IconWrapper> Humidity: {classroom.humidity}%
            </p>
            <p>
              <IconWrapper><NoiseIcon bad /></IconWrapper> Noise Level: {classroom.noise} dB
            </p>
            <p>
              <IconWrapper><LuminanceIcon bad /></IconWrapper> Luminance Level: {classroom.luminance} lux
            </p>
            <p>
              <IconWrapper><TemperatureIcon bad /></IconWrapper> Temperature: {classroom.temperature}°C
            </p>
          </Card>
        ))}
      </CardContainer>
      <ButtonContainer>
        <Button onClick={handlePreviousClick}>Previous</Button>
        <Button onClick={handleNextClick}>Next</Button>
      </ButtonContainer>
    </div>
  );
};

export default BadConditions;
