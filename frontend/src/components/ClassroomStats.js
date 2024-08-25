import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaHome, FaCalendarAlt, FaClock } from 'react-icons/fa'; // Importing icons from react-icons/fa

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
          <h3 style={{ fontFamily: 'Poppins', fontWeight: 300 }}>Number of classrooms in good condition</h3>
          <p>43</p>
        </StatBox>
        <StatBox>
          <h3 style={{ fontFamily: 'Poppins', fontWeight: 300 }}>Number of classes available</h3>
          <p>100</p>
        </StatBox>
        <StatBox>
          <h3 style={{ fontFamily: 'Poppins', fontWeight: 300 }}>Number of classrooms in bad condition</h3>
          <p>68</p>
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
