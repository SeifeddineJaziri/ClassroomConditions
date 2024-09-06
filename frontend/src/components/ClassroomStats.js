import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaHome, FaCalendarAlt, FaClock } from 'react-icons/fa'; // Importing icons from react-icons/fa


const classroomsData = [
  { number: 101, occupied: true },
  { number: 102, occupied: false },
  { number: 103, occupied: true },
  { number: 104, occupied: false },
  { number: 105, occupied: true },
  { number: 106, occupied: false },
];

const StatsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 20px;
  flex-wrap: wrap;
`;

const StatBox = styled.div`
  background-color: #FFF;
  color: #60707E; /* Font color */
  padding: 20px;
  width: 230px;
  border-radius: 25px;
  box-shadow: 12px 14px 3px -3px rgba(0,0,0,0.1);
  text-align: center;
  margin: 5px 10px; /* Adjusted margin for top and bottom */
  font-family: 'Poppins', sans-serif; /* Poppins font */
`;

const TitleWrapper = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  display: inline-flex; /* Ensures icon and text are inline */
  align-items: center; /* Vertically center items */
  font-family: 'Poppins', sans-serif; /* Poppins font */
  font-weight: 300; /* Thin variant */
`;

const Icon = styled(FaHome)`
  margin-right: 10px; /* Adjust margin between icon and text */
  height: 50px;
`;

const DateIcon = styled(FaCalendarAlt)`
  margin-right: 5px; /* Adjust margin between icon and text */
  height: 20px;
`;

const ClockIcon = styled(FaClock)`
  margin-right: 5px; /* Adjust margin between icon and text */
  height: 20px;
`;

const ClassroomStats = () => {
  const [dateTime, setDateTime] = useState(new Date());

  
  const occupiedClassrooms = classroomsData.filter(classroom => classroom.occupied);
  const nonOccupiedClassrooms = classroomsData.filter(classroom => !classroom.occupied);

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer); // Cleanup timer on component unmount
  }, []);

  return (
    <>
      <TitleWrapper>
        <Title>
          <Icon />
          Home
        </Title>
      </TitleWrapper>
      <StatsWrapper>
        <StatBox>
          <h3 style={{ fontFamily: 'Poppins', fontWeight: 300 }}>Number of classrooms occupied</h3>
          <p>{occupiedClassrooms.length}</p> {/* Display occupied classrooms count */}
        </StatBox>
        <StatBox>
          <h3 style={{ fontFamily: 'Poppins', fontWeight: 300 }}>Number of classrooms not occupied</h3>
          <p>{nonOccupiedClassrooms.length}</p> {/* Display non-occupied classrooms count */}
        </StatBox>
        <StatBox>
          <h3 style={{ fontFamily: 'Poppins', fontWeight: 300 }}>Total number of classrooms</h3>
          <p>{classroomsData.length}</p> {/* Display total number of classrooms */}
        </StatBox>
        <StatBox>
          <h3 style={{ fontFamily: 'Poppins', fontWeight: 300 }}>Date and Time</h3>
          <div>
            <DateIcon /> {dateTime.toLocaleDateString()}
          </div>
          <div>
            <ClockIcon /> {dateTime.toLocaleTimeString()}
          </div>
        </StatBox>
      </StatsWrapper>
    </>
  );
};

export default ClassroomStats;
