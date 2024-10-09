import React, { useState } from 'react';
import styled from 'styled-components';
import { FaTint, FaVolumeUp, FaSun, FaTemperatureHigh } from 'react-icons/fa';
import { MdOutlineAccessTimeFilled, MdDateRange } from 'react-icons/md';

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
  cursor: pointer;

  &:hover {
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
  padding: 20px;
`;

const CardFront = styled(CardFace)`
  background-color: #d4edda;
  color: #60707E;
`;

const Title = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const HumidityIcon = styled(FaTint)`color: #3498db;`;
const NoiseIcon = styled(FaVolumeUp)`color: #e74c3c;`;
const LuminanceIcon = styled(FaSun)`color: #f39c12;`;
const TemperatureIcon = styled(FaTemperatureHigh)`color: #2ecc71;`;
const TimeIcon = styled(MdOutlineAccessTimeFilled)`color: #9b59b6;`;
const DateIcon = styled(MdDateRange)`color: #3498db;`;

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
  flex-direction: column;
  align-items: center;
`;

const InputRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100px; /* Adjust width as needed */
  margin: 0 10px;
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
const DateInput = styled(Input)`
  width: 150px; /* Adjust this value as needed for length */
`;

const GoodConditions = () => {
  const [searchTime, setSearchTime] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [showIcons, setShowIcons] = useState(true); // State to manage icon visibility
  const [temperature, setTemperature] = useState('--'); // State for temperature
  const [humidity, setHumidity] = useState('--'); // State for humidity
  const [luminance, setLuminance] = useState('--'); // State for luminance
  const [noise, setNoise] = useState('--'); // State for noise
  const [time, setTime] = useState('--:--'); // State for time
  const [date, setDate] = useState('----/--/--'); // State for date
  const [StudyScore ,setStudyScore ] = useState('--') ; 

  const handleTimeChange = (e) => {
    setSearchTime(e.target.value);
  };

  const handleDateChange = (e) => {
    setSearchDate(e.target.value);
  };

  const handleFetch = () => {
    if (!searchDate || !searchTime) {
      console.error('Please provide both date and time before fetching.');
      return;
    }

    const month = searchDate.slice(5, 7);
    const day = searchDate.slice(8, 10);
    const hour = searchTime.slice(0, 2);
    const minute = searchTime.slice(3, 5);

    setShowIcons(false); 

    fetch('http://localhost:8000/time', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ month: parseInt(month), day: parseInt(day), hour: parseInt(hour), minute: parseInt(minute) }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Server responded with status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setStudyScore(`${(data.StudyScore)}`);
        setTemperature(`${Math.round(data.variables.temp)}°C`);
        setHumidity(`${Math.round(data.variables.hum)}%`);
        setLuminance(`${Math.round(data.variables.lum)} lux`);
        setNoise(`${Math.round(data.variables.noise)} dB`);
        setTime(searchTime);
        setDate(searchDate);
        setShowIcons(true); // Show icons after fetching data
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        setShowIcons(true); // Ensure icons are shown if there's an error
      });
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Sorted Conditions</h1>

      <InputContainer>
        <InputRow>
          <label htmlFor="time-input" style={{ marginRight: '10px' }}>Select Time:</label>
          <Input
            id="time-input"
            type="time"
            value={searchTime}
            onChange={handleTimeChange}
            aria-label="Time input"
          />
          <label htmlFor="date-input" style={{ marginRight: '10px' }}>Select Date:</label>
          <DateInput
            id="date-input"
            type="date"
            value={searchDate}
            onChange={handleDateChange}
            aria-label="Date input"
          />
        </InputRow>
        <ButtonContainer>
          <Button onClick={handleFetch}>Submit</Button>
        </ButtonContainer>
      </InputContainer>

      <CardContainer>
        <CardWrapper>
          <Card>
            <CardFront>
              <Title id="classroom-number">Classroom</Title>
              {showIcons && ( // Conditional rendering for icons
                <>
                  <p id="StudyScore" >StudyScore: {StudyScore}</p>
                  <p id="temperature"><TemperatureIcon /> Temp: {temperature}</p>
                  <p id="humidity"><HumidityIcon /> Humidity: {humidity}</p>
                  <p id="luminance"><LuminanceIcon /> Luminance: {luminance}</p>
                  <p id="noise"><NoiseIcon /> Noise: {noise}</p>
                  <p id="time"><TimeIcon /> {time}</p>
                  <p id="date"><DateIcon /> {date}</p>
                </>
              )}
            </CardFront>
          </Card>
        </CardWrapper>
      </CardContainer>
    </div>
  );
};

export default GoodConditions;
