import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaTint, FaVolumeUp, FaSun, FaTemperatureHigh, FaSmile, FaChalkboardTeacher, FaUserGraduate } from 'react-icons/fa';
import { MdOutlineAccessTimeFilled, MdDateRange } from "react-icons/md";
import { useNavigate } from 'react-router-dom';


  const classroomsData = [
    {
      number: 101,
      humidity: 55,
      noise: 40,
      luminance: 300,
      temperature: 25,
      time: '08:00',
      date: '2024-08-01',
      occupied: false,
      students: 25,
      tutor: 'Dr. Alice Smith',
      subject: 'Mathematics'
    },
    {
      number: 102,
      humidity: 60,
      noise: 45,
      luminance: 280,
      temperature: 24,
      time: '09:00',
      date: '2024-08-01',
      occupied: true,
      students: 30,
      tutor: 'Prof. John Doe',
      subject: 'Physics'
    },
    {
      number: 103,
      humidity: 50,
      noise: 42,
      luminance: 320,
      temperature: 26,
      time: '10:00',
      date: '2024-08-02',
      occupied: false,
      students: 20,
      tutor: 'Ms. Emily Johnson',
      subject: 'Chemistry'
    },
    {
      number: 104,
      humidity: 58,
      noise: 38,
      luminance: 310,
      temperature: 23,
      time: '11:00',
      date: '2024-08-02',
      occupied: true,
      students: 28,
      tutor: 'Mr. Michael Brown',
      subject: 'Biology'
    },
    {
      number: 105,
      humidity: 62,
      noise: 41,
      luminance: 290,
      temperature: 25,
      time: '12:00',
      date: '2024-08-03',
      occupied: false,
      students: 22,
      tutor: 'Dr. Laura Wilson',
      subject: 'History'
    },
    {
      number: 106,
      humidity: 48,
      noise: 39,
      luminance: 315,
      temperature: 24,
      time: '13:00',
      date: '2024-08-03',
      occupied: true,
      students: 27,
      tutor: 'Prof. David Lee',
      subject: 'Geography'
    }
  ];
  


const slideInNext = keyframes`
  from {
    transform: translateX(70%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideInPrev = keyframes`
  from {
    transform: translateX(-70%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 20px;
  flex-wrap: nowrap;
  overflow: hidden;
`;

const CardWrapper = styled.div`
  position: relative;
  width: 250px;
  height: 300px;
  perspective: 1000px;
  margin: 10px;
`;

const Card = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  transition: transform 0.8s, box-shadow 0.8s;
  transform-style: preserve-3d;
  transform: ${({ isFlipped }) => (isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)')};
  cursor: pointer;
  animation: ${({ slideDirection }) => slideDirection === 'next' ? slideInNext : slideInPrev} 0.5s ease;

  &:hover {
    transform: rotateY(180deg);
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3);
  }
`;

const CardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  padding: 20px;
`;

const CardFront = styled(CardFace)`
  background-color: ${({ occupied }) => (occupied ? '#f8d7da' : '#d4edda')};
  color: #60707E;
`;

const CardBack = styled(CardFace)`
  background: linear-gradient(135deg, #3498db, #2ecc71);
  color: #fff;
  transform: rotateY(180deg);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const Button = styled.button`
  background-color: #3498db;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 10px;

  &:hover {
    background-color: #2980b9;
  }

  &:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
  }
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

const HumidityIcon = styled(FaTint)`color: #3498db;`;
const NoiseIcon = styled(FaVolumeUp)`color: #e74c3c;`;
const LuminanceIcon = styled(FaSun)`color: #f39c12;`;
const TemperatureIcon = styled(FaTemperatureHigh)`color: #2ecc71;`;
const SmileIcon = styled(FaSmile)`color: #f7b731;`;
const TimeIcon = styled(MdOutlineAccessTimeFilled)`color: #9b59b6;`;
const DateIcon = styled(MdDateRange)`color: #3498db;`;
const TutorIcon = styled(FaChalkboardTeacher)`color: #fff;`;
const StudentIcon = styled(FaUserGraduate)`color: #fff;`;

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
  margin: 0 10px;
`;

const GoodConditions = () => {
  const [searchTime, setSearchTime] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [filteredClassrooms, setFilteredClassrooms] = useState(classroomsData);
  const [currentPage, setCurrentPage] = useState(0);
  const [cardsPerPage] = useState(3);
  const [slideDirection, setSlideDirection] = useState('next');
  const navigate = useNavigate();

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

  const handleCardClick = (classroom) => {
    navigate(`/classroom/${classroom.number}`, { state: { classroom } });
  };

  const handleNext = () => {
    setSlideDirection('next');
    if (currentPage < Math.ceil(filteredClassrooms.length / cardsPerPage) - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    setSlideDirection('prev');
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIdx = currentPage * cardsPerPage;
  const currentCards = filteredClassrooms.slice(startIdx, startIdx + cardsPerPage);

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
        {currentCards.map((classroom, index) => (
          <CardWrapper key={index}>
            <Card
              onClick={() => handleCardClick(classroom)}
              occupied={classroom.occupied}
              slideDirection={slideDirection}
            >
              <CardFront occupied={classroom.occupied}>
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
                <p>
                  <IconWrapper></IconWrapper> Occupied: {classroom.occupied ? 'Yes' : 'No'}
                </p>
              </CardFront>
              <CardBack>
                <h3>Details</h3>
                {classroom.occupied ?(
                  <>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <TutorIcon size={24} />
                      <span>{classroom.tutor}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
                      <StudentIcon size={24} />
                      <span>{classroom.students} students</span>
                    </div>
                    <p>Subject: {classroom.subject}</p>
                  </>
                ) : (
                  <p>This classroom is currently empty.</p>
                )}
              </CardBack>
            </Card>
          </CardWrapper>
        ))}
      </CardContainer>

      <ButtonContainer>
        <Button onClick={handlePrevious} disabled={currentPage === 0}>Previous</Button>
        <Button onClick={handleNext} disabled={currentPage >= Math.ceil(filteredClassrooms.length / cardsPerPage) - 1}>Next</Button>
      </ButtonContainer>
    </div>
  );
};

export default GoodConditions;

