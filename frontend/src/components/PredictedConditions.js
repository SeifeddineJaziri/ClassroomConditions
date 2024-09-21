import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaTint, FaVolumeUp, FaSun, FaTemperatureHigh } from 'react-icons/fa';
import { MdOutlineAccessTimeFilled, MdDateRange } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

// Simulated predicted classroom data (replace with actual data later)
const predictedClassrooms = [
  {
    number: 107,
    humidity: 60,
    noise: 50,
    luminance: 300,
    temperature: 23,
    time: '14:00',
    date: '2024-08-05',
    occupied: false,
    students: 0,
    tutor: null,
    subject: null
  },
  {
    number: 108,
    humidity: 62,
    noise: 45,
    luminance: 320,
    temperature: 24,
    time: '15:00',
    date: '2024-08-05',
    occupied: true,
    students: 30,
    tutor: 'Dr. Alice Smith',
    subject: 'Mathematics'
  }
];

// Keyframe animation for loading spinner
const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Styled Components
const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full viewport height */
  flex-direction: column;
`;

const LoadingSpinner = styled.div`
  border: 8px solid #f3f3f3;
  border-top: 8px solid #3498db;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: ${rotate} 2s linear infinite;
`;

const LoadingMessage = styled.p`
  text-align: center;
  font-size: 18px;
  color: #3498db;
  margin-top: 10px;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 20px;
  flex-wrap: wrap;
`;

const Card = styled.div`
  background: #fff;
  border-radius: 15px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 300px;
  margin: 15px;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
  }
`;

const CardTitle = styled.h3`
  font-size: 22px;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
`;

const CardSubTitle = styled.p`
  font-size: 14px;
  color: #999;
  margin-bottom: 20px;
`;

const DetailsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const IconWrapper = styled.div`
  font-size: 18px;
  color: ${({ color }) => color}; /* Icon color is passed dynamically */
  margin-right: 10px;
`;

const DataLabel = styled.p`
  font-size: 16px;
  color: #333;
  margin: 0;
`;

const DataValue = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin: 0;
  color: ${({ value }) => (value > 70 ? '#d9534f' : '#5cb85c')}; /* Red for high, green for normal */
`;

const DetailsButton = styled.button`
  background-color: #3498db;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #2980b9;
  }
`;

const PredictedConditions = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleDetailsClick = (classroom) => {
    navigate(`/classroom/${classroom.number}`, { state: { classroom } });
  };

  if (loading) {
    return (
      <LoadingContainer>
        <LoadingSpinner />
        <LoadingMessage>Loading predicted classroom conditions...</LoadingMessage>
      </LoadingContainer>
    );
  }

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Predicted Classroom Conditions</h1>
      <CardContainer>
        {predictedClassrooms.map((classroom, index) => (
          <Card key={index}>
            <CardTitle>Classroom {classroom.number}</CardTitle>
            <CardSubTitle>{classroom.occupied ? "Occupied" : "Empty"}</CardSubTitle>

            <DetailsContainer>
              <IconWrapper color="#3498db"><FaTint /></IconWrapper>
              <DataLabel>Humidity:</DataLabel>
              <DataValue value={classroom.humidity}>{classroom.humidity}%</DataValue>
            </DetailsContainer>

            <DetailsContainer>
              <IconWrapper color="#e74c3c"><FaVolumeUp /></IconWrapper>
              <DataLabel>Noise:</DataLabel>
              <DataValue value={classroom.noise}>{classroom.noise} dB</DataValue>
            </DetailsContainer>

            <DetailsContainer>
              <IconWrapper color="#f39c12"><FaSun /></IconWrapper>
              <DataLabel>Luminance:</DataLabel>
              <DataValue value={classroom.luminance}>{classroom.luminance} lux</DataValue>
            </DetailsContainer>

            <DetailsContainer>
              <IconWrapper color="#e67e22"><FaTemperatureHigh /></IconWrapper>
              <DataLabel>Temperature:</DataLabel>
              <DataValue value={classroom.temperature}>{classroom.temperature}°C</DataValue>
            </DetailsContainer>

            <DetailsContainer>
              <IconWrapper color="#16a085"><MdOutlineAccessTimeFilled /></IconWrapper>
              <DataLabel>Time:</DataLabel>
              <DataValue>{classroom.time}</DataValue>
            </DetailsContainer>

            <DetailsContainer>
              <IconWrapper color="#8e44ad"><MdDateRange /></IconWrapper>
              <DataLabel>Date:</DataLabel>
              <DataValue>{classroom.date}</DataValue>
            </DetailsContainer>

            <DetailsButton onClick={() => handleDetailsClick(classroom)}>
              View Details
            </DetailsButton>
          </Card>
        ))}
      </CardContainer>
    </div>
  );
};

export default PredictedConditions;
