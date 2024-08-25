import React, { useState } from 'react';
import styled from 'styled-components';
import { FaTint, FaVolumeUp, FaSun, FaTemperatureHigh, FaSmile } from 'react-icons/fa'; // Importing icons from react-icons/fa

// Example data for six classrooms
const classroomsData = [
  { number: 101, humidity: 55, noise: 40, luminance: 300, temperature: 25 },
  { number: 102, humidity: 60, noise: 45, luminance: 280, temperature: 24 },
  { number: 103, humidity: 50, noise: 42, luminance: 320, temperature: 26 },
  { number: 104, humidity: 58, noise: 38, luminance: 310, temperature: 23 },
  { number: 105, humidity: 62, noise: 41, luminance: 290, temperature: 25 },
  { number: 106, humidity: 48, noise: 39, luminance: 315, temperature: 24 },
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
  color: #3498db; /* Blue color */
`;

const NoiseIcon = styled(FaVolumeUp)`
  color: #e74c3c; /* Red color */
`;

const LuminanceIcon = styled(FaSun)`
  color: #f39c12; /* Orange color */
`;

const TemperatureIcon = styled(FaTemperatureHigh)`
  color: #2ecc71; /* Green color */
`;

const SmileIcon = styled(FaSmile)`
  color: #f7b731; /* Yellow color */
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

const GoodConditions = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const handleNextClick = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex === classroomsData.length - 1 ? 0 : prevIndex + 1));
  };

  const handlePreviousClick = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex === 0 ? classroomsData.length - 1 : prevIndex - 1));
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Good Conditions</h1>
      <CardContainer>
        {classroomsData.map((classroom, index) => (
          <Card key={index}>
            <Title>
              <IconWrapper><LuminanceIcon /></IconWrapper>
              <IconWrapper><SmileIcon /></IconWrapper>
              Classroom {classroom.number}
            </Title>
            <p>
              <IconWrapper><HumidityIcon /></IconWrapper> Humidity: {classroom.humidity}%
            </p>
            <p>
              <IconWrapper><NoiseIcon /></IconWrapper> Noise Level: {classroom.noise} dB
            </p>
            <p>
              <IconWrapper><LuminanceIcon /></IconWrapper> Luminance Level: {classroom.luminance} lux
            </p>
            <p>
              <IconWrapper><TemperatureIcon /></IconWrapper> Temperature: {classroom.temperature}°C
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

export default GoodConditions;
