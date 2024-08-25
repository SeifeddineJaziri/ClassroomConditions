import React, { useState } from 'react';
import styled from 'styled-components';
import { FaTint, FaVolumeUp, FaSun, FaTemperatureHigh, FaFrown } from 'react-icons/fa';
import { MdOutlineAccessTimeFilled, MdDateRange } from "react-icons/md";

const classroomsData = [
  { number: 201, humidity: 75, noise: 60, luminance: 200, temperature: 28, time: '08:00', date: '2024-08-01' },
  { number: 202, humidity: 80, noise: 65, luminance: 180, temperature: 27, time: '09:00', date: '2024-08-01' },
  { number: 203, humidity: 70, noise: 62, luminance: 220, temperature: 29, time: '10:00', date: '2024-08-02' },
  { number: 204, humidity: 78, noise: 58, luminance: 210, temperature: 26, time: '11:00', date: '2024-08-02' },
  { number: 205, humidity: 82, noise: 61, luminance: 190, temperature: 28, time: '12:00', date: '2024-08-03' },
  { number: 206, humidity: 68, noise: 59, luminance: 215, temperature: 27, time: '13:00', date: '2024-08-03' },
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
  color: #e74c3c; /* Red color for the time icon */
`;

const DateIcon = styled(MdDateRange)`
  color: #e74c3c; /* Red color for the date icon */
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
  margin: 0 10px; /* Spacing between inputs */
`;

const BadConditions = () => {
  const [searchTime, setSearchTime] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [filteredClassrooms, setFilteredClassrooms] = useState(classroomsData);

  const handleTimeChange = (e) => {
    const time = e.target.value;
    setSearchTime(time);
    filterClassrooms(time, searchDate);
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    setSearchDate(date);
    filterClassrooms(searchTime, date);
  };

  const filterClassrooms = (time, date) => {
    let filtered = classroomsData;

    if (time) {
      filtered = filtered.filter(classroom => classroom.time === time);
    }
    if (date) {
      filtered = filtered.filter(classroom => classroom.date === date);
    }

    setFilteredClassrooms(filtered);
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
        <Input
          type="date"
          placeholder="Enter date (YYYY-MM-DD)"
          value={searchDate}
          onChange={handleDateChange}
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
            <p>
              <IconWrapper><DateIcon /></IconWrapper> Date: {classroom.date}
            </p>
          </Card>
        ))}
      </CardContainer>
    </div>
  );
};

export default BadConditions;
