import React from 'react';
import styled from 'styled-components';
import { FaExclamationCircle } from 'react-icons/fa'; 

const NotificationsWrapper = styled.div`
  padding: 20px;
  max-width: 500px;
  margin: 0 auto; /* Center the notifications */
  font-family: 'Poppins', sans-serif;
`;

const NotificationTitle = styled.h2`
  font-size: 24px;
  font-family: 'Poppins', sans-serif;
  text-align: center;
  margin-bottom: 20px;
`;

const NotificationList = styled.ul`
  list-style: none;
  padding: 0;
`;

const NotificationItem = styled.li`
  background-color: #f9f9f9;
  border-left: 5px solid #007bff;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out;

  &:hover {
    box-shadow: 0 4px 15px rgba(255, 0, 0, 0.7); /* Red shadow on hover */
    cursor : pointer ;
  }
`;

const IconWrapper = styled.div`
  margin-right: 10px;
  color: #ff6b6b;
`;

const NotificationText = styled.p`
  margin: 0;
  font-size: 16px;
  color: #333;
`;

const Notifications = () => {
  return (
    <NotificationsWrapper>
      <NotificationTitle>Notifications</NotificationTitle>
      <NotificationList>
       
        <NotificationItem>
          <IconWrapper>
            <FaExclamationCircle />
          </IconWrapper>
          <NotificationText>Humidity in Classroom 101 exceeded 60%</NotificationText>
        </NotificationItem>
        <NotificationItem>
          <IconWrapper>
            <FaExclamationCircle />
          </IconWrapper>
          <NotificationText>Temperature in Classroom 102 exceeded 30°C</NotificationText>
        </NotificationItem>
        <NotificationItem>
          <IconWrapper>
            <FaExclamationCircle />
          </IconWrapper>
          <NotificationText>Noise levels in Classroom 203 exceeded 75dB</NotificationText>
        </NotificationItem>
        <NotificationItem>
          <IconWrapper>
            <FaExclamationCircle />
          </IconWrapper>
          <NotificationText>Luminance in Classroom 204 dropped below 300 lux</NotificationText>
        </NotificationItem>
        <NotificationItem>
          <IconWrapper>
            <FaExclamationCircle />
          </IconWrapper>
          <NotificationText>Air quality in Classroom 105 shows high CO2 levels</NotificationText>
        </NotificationItem>
        <NotificationItem>
          <IconWrapper>
            <FaExclamationCircle />
          </IconWrapper>
          <NotificationText>Temperature in Classroom 301 dropped below 18°C</NotificationText>
        </NotificationItem>
      </NotificationList>
    </NotificationsWrapper>
  );
};

export default Notifications;
