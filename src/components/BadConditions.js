import React, { useState } from 'react';
import styled from 'styled-components';
import { FaTint, FaVolumeUp, FaSun, FaTemperatureHigh, FaFrown } from 'react-icons/fa';
import { MdOutlineAccessTimeFilled } from "react-icons/md";


const classroomsData = [
  { number: 201, humidity: 75, noise: 60, luminance: 200, temperature: 28, time: '08:00' },
  { number: 202, humidity: 80, noise: 65, luminance: 180, temperature: 27, time: '09:00' },
  { number: 203, humidity: 70, noise: 62, luminance: 220, temperature: 29, time: '10:00' },
  { number: 204, humidity: 78, noise: 58, luminance: 210, temperature: 26, time: '11:00' },
  { number: 205, humidity: 82, noise: 61, luminance: 190, temperature: 28, time: '12:00' },
  { number: 206, humidity: 68, noise: 59, luminance: 215, temperature: 27, time: '13:00' },
];

const CardContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 20px;
  flex-wrap: wrap;
`;

const Card = styled.div`
  background-color: #ffffff;
  color: #60707E;
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
  color: #e74c3c; /* Red color for bad conditions */
`;

const NoiseIcon = styled(FaVolumeUp)`
  color: #e74c3c; /* Red color for bad conditions */
`;

const LuminanceIcon = styled(FaSun)`
  color: #e74c3c; /* Red color for bad conditions */
`;

const TemperatureIcon = styled(FaTemperatureHigh)`
  color: #e74c3c; /* Red color for bad conditions */
`;

const FrownIcon = styled(FaFrown)`
  color: #e74c3c; /* Red color */
`;
const TimeIcon = styled(MdOutlineAccessTimeFilled)`
  color: #e74c3c; /* New color for the time icon */
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 200px;
`;

const BadConditions = () => {
  const [searchTime, setSearchTime] = useState('');
  const [filteredClassrooms, setFilteredClassrooms] = useState(classroomsData);

  const handleTimeChange = (e) => {
    const time = e.target.value;
    setSearchTime(time);

    // Filter classrooms based on the entered time
    if (time) {
      const filtered = classroomsData.filter(
        classroom => classroom.time === time
      );
      setFilteredClassrooms(filtered);
    } else {
      setFilteredClassrooms(classroomsData);
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Bad Conditions</h1>
      
      <InputContainer>
        <Input
          type="time"
          placeholder="Enter time (e.g., 08:00)"
          value={searchTime}
          onChange={handleTimeChange}
        />
      </InputContainer>

      <CardContainer>
        {filteredClassrooms.map((classroom, index) => (
          <Card key={index}>
            <Title>
              <IconWrapper><LuminanceIcon /></IconWrapper>
              <IconWrapper><FrownIcon /></IconWrapper>
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
            <p>
              <IconWrapper><TimeIcon /></IconWrapper> Time: {classroom.time}
            </p>
          </Card>
        ))}
      </CardContainer>
    </div>
  );
};

export default BadConditions;
