import React, { useState } from 'react';
import styled from 'styled-components';
import { FaTint, FaVolumeUp, FaSun, FaTemperatureHigh, FaSmile } from 'react-icons/fa';
import { MdOutlineAccessTimeFilled, MdDateRange } from "react-icons/md";

const classroomsData = [
  { number: 101, humidity: 55, noise: 40, luminance: 300, temperature: 25, time: '08:00', date: '2024-08-01' },
  { number: 102, humidity: 60, noise: 45, luminance: 280, temperature: 24, time: '09:00', date: '2024-08-01' },
  { number: 103, humidity: 50, noise: 42, luminance: 320, temperature: 26, time: '10:00', date: '2024-08-02' },
  { number: 104, humidity: 58, noise: 38, luminance: 310, temperature: 23, time: '11:00', date: '2024-08-02' },
  { number: 105, humidity: 62, noise: 41, luminance: 290, temperature: 25, time: '12:00', date: '2024-08-03' },
  { number: 106, humidity: 48, noise: 39, luminance: 315, temperature: 24, time: '13:00', date: '2024-08-03' },
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
  color: #3498db; /* Blue color for good conditions */
`;

const NoiseIcon = styled(FaVolumeUp)`
  color: #e74c3c; /* Blue color for good conditions */
`;

const LuminanceIcon = styled(FaSun)`
  color: #f39c12; /* Blue color for good conditions */
`;

const TemperatureIcon = styled(FaTemperatureHigh)`
  color: #2ecc71; /* Blue color for good conditions */
`;

const SmileIcon = styled(FaSmile)`
  color: #f7b731; /* Yellow color for smile icon */
`;

const TimeIcon = styled(MdOutlineAccessTimeFilled)`
  color: #9b59b6; /* Blue color for the time icon */
`;

const DateIcon = styled(MdDateRange)`
  color: #3498db; /* Blue color for the date icon */
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

const GoodConditions = () => {
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
      <h1 style={{ textAlign: 'center' }}>Good Conditions</h1>
      
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

export default GoodConditions;
