import React, { useState } from 'react';
import styled from 'styled-components';
import { FaTint, FaVolumeUp, FaSun, FaTemperatureHigh } from 'react-icons/fa';
import { MdOutlineAccessTimeFilled, MdDateRange } from 'react-icons/md';

const classroomsData = [
  { number: 101, humidity: 55, noise: 40, luminance: 300, temperature: 25, time: '08:00', date: '2024-08-01', occupied: false, students: 25, tutor: 'Dr. Alice Smith', subject: 'Mathematics', reason: 'Ideal temperature and luminance for morning sessions.' },
  { number: 102, humidity: 60, noise: 45, luminance: 280, temperature: 24, time: '09:00', date: '2024-08-01', occupied: true, students: 30, tutor: 'Prof. John Doe', subject: 'Physics', reason: 'Moderate humidity and quieter atmosphere suitable for focused learning.' },
  { number: 103, humidity: 50, noise: 42, luminance: 320, temperature: 26, time: '10:00', date: '2024-08-02', occupied: false, students: 20, tutor: 'Ms. Emily Johnson', subject: 'Chemistry', reason: 'Perfect for lab work due to excellent luminance and temperature.' },
];

// Add more reasons
const reasons = [
  'Ideal for collaborative work due to spacious layout.',
  'Optimal learning environment with adequate resources.',
  'Perfect for interactive sessions with technology support.',
  'Well-suited for quiet study sessions with minimal distractions.',
  'Great for creative classes with ample natural light.',
];

const segmentsMap = {
  0: [true, true, true, true, true, true, false],
  1: [false, true, true, false, false, false, false],
  2: [true, true, false, true, true, false, true],
  3: [true, true, true, true, false, false, true],
  4: [false, true, true, false, false, true, true],
  5: [true, false, true, true, false, true, true],
  6: [true, false, true, true, true, true, true],
  7: [true, true, true, false, false, false, false],
  8: [true, true, true, true, true, true, true],
  9: [true, true, true, true, false, true, true],
};

// 7-Segment Display Component
const SevenSegment = ({ digit }) => {
  const segments = segmentsMap[digit];
  return (
    <svg viewBox="0 0 20 40" width="50" height="100">
      <polygon points="4,2 16,2 14,6 6,6" fill={segments[0] ? 'white' : 'transparent'} />  {/* Top */}
      <polygon points="14,6 16,8 16,18 14,20 12,18 12,8" fill={segments[1] ? 'white' : 'transparent'} />  {/* Top-right */}
      <polygon points="14,22 16,24 16,34 14,36 12,34 12,24" fill={segments[2] ? 'white' : 'transparent'} />  {/* Bottom-right */}
      <polygon points="4,36 16,36 14,34 6,34" fill={segments[3] ? 'white' : 'transparent'} />  {/* Bottom */}
      <polygon points="4,22 6,24 6,34 4,36 2,34 2,24" fill={segments[4] ? 'white' : 'transparent'} />  {/* Bottom-left */}
      <polygon points="4,6 6,8 6,18 4,20 2,18 2,8" fill={segments[5] ? 'white' : 'transparent'} />  {/* Top-left */}
      <polygon points="4,20 6,18 14,18 16,20 14,22 6,22" fill={segments[6] ? 'white' : 'transparent'} />  {/* Middle */}
    </svg>
  );
};

const HumidityIcon = styled(FaTint)`color: #3498db;`;
const NoiseIcon = styled(FaVolumeUp)`color: #e74c3c;`;
const LuminanceIcon = styled(FaSun)`color: #f39c12;`;
const TemperatureIcon = styled(FaTemperatureHigh)`color: #2ecc71;`;
const TimeIcon = styled(MdOutlineAccessTimeFilled)`color: #9b59b6;`;
const DateIcon = styled(MdDateRange)`color: #3498db;`;

// Clock Component using 7-segment digits
const RectangularClock = ({ hour, minute }) => {
  const getDigits = (num) => [Math.floor(num / 10), num % 10]; // Split number into tens and ones

  const hourDigits = getDigits(hour);
  const minuteDigits = getDigits(minute);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '20px',
        padding: '20px',
        backgroundColor: 'black',
        border: '5px solid white',
        borderRadius: '10px',
        boxShadow: '0px 0px 15px rgba(255, 255, 255, 0.5)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <SevenSegment digit={hourDigits[0]} />
        <SevenSegment digit={hourDigits[1]} />
        <div style={{ fontSize: '48px', color: 'white', padding: '0 10px' }}>:</div>
        <SevenSegment digit={minuteDigits[0]} />
        <SevenSegment digit={minuteDigits[1]} />
      </div>
    </div>
  );
};

const ClassroomApp = () => {
  const [inputTime, setInputTime] = useState('08:00');
  const [inputDate, setInputDate] = useState('2024-08-01'); // Default date
  const [showClock, setShowClock] = useState(true);
  const [temperature, setTemperature] = useState('--'); // State for temperature
  const [humidity, setHumidity] = useState('--'); // State for humidity
  const [luminance, setLuminance] = useState('--'); // State for luminance
  const [noise, setNoise] = useState('--'); // State for noise
  const [time, setTime] = useState(inputTime); // Set initial time to inputTime
  const [date, setDate] = useState('----/--/--'); // State for date
  const [selectedReason, setSelectedReason] = useState(''); // State for the reason

  // Handle time change
  const handleTimeChange = (e) => {
    const timeString = e.target.value;
    setInputTime(timeString);
    setTime(timeString); // Update clock time immediately
  };

  // Handle date change
  const handleDateChange = (e) => {
    setInputDate(e.target.value);
  };

  // Fetch classroom data based on time and date
  const handleFetch = () => {
    if (!inputTime || !inputDate) {
      console.error('Please provide both date and time before fetching.');
      return;
    }

    const month = inputDate.slice(5, 7);
    const day = inputDate.slice(8, 10);
    const hour = inputTime.slice(0, 2);
    const minute = inputTime.slice(3, 5);

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
        setTemperature(`${Math.round(data.variables.temp)}°C`);
        setHumidity(`${Math.round(data.variables.hum)}%`);
        setLuminance(`${Math.round(data.variables.lum)} lux`);
        setNoise(`${Math.round(data.variables.noise)} dB`);
        setDate(inputDate);
        setSelectedReason(reasons[Math.floor(Math.random() * reasons.length)]); // Select a random reason
        setShowClock(false); // Hide the clock when data is fetched
      })
      .catch((err) => {
        console.error('Fetch error:', err);
      });
  };

  // Handle Back to Clock button
  const handleBackToClock = () => {
    setShowClock(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 style={{ fontFamily: 'Arial, sans-serif', fontSize: '24px', margin: '20px 0', color: 'black' }}>
        Classroom Suggestion Based on Time and Date
      </h1>

      {/* Time and Date Inputs */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '20px' }}>
        {/* Time Input */}
        <div>
          <label style={{ fontSize: '16px', color: 'black' }}>Select Time:</label>
          <input
            type="time"
            value={inputTime}
            onChange={handleTimeChange}
            style={{ marginLeft: '10px', padding: '5px', fontSize: '16px' }}
          />
        </div>
        {/* Date Input */}
        <div>
          <label style={{ fontSize: '16px', color: 'black' }}>Select Date:</label>
          <input
            type="date"
            value={inputDate}
            onChange={handleDateChange}
            style={{ marginLeft: '10px', padding: '5px', fontSize: '16px' }}
          />
        </div>
      </div>

      {/* Clock or Data Display */}
      {showClock ? (
        <RectangularClock hour={parseInt(time.split(':')[0]) || 0} minute={parseInt(time.split(':')[1]) || 0} />
      ) : (
        <DataCard>
          <h2 style={{ fontSize: '20px', margin: '0' }}>Classroom Data</h2>
          <div style={{ margin: '10px 0' }}>
            <TemperatureIcon /> {temperature}
          </div>
          <div style={{ margin: '10px 0' }}>
            <HumidityIcon /> {humidity}
          </div>
          <div style={{ margin: '10px 0' }}>
            <LuminanceIcon /> {luminance}
          </div>
          <div style={{ margin: '10px 0' }}>
            <NoiseIcon /> {noise}
          </div>
          <div style={{ margin: '10px 0' }}>
            <TimeIcon /> {time}
          </div>
          <div style={{ margin: '10px 0' }}>
            <DateIcon /> {date}
          </div>
          <div style={{ margin: '10px 0', fontStyle: 'italic' }}>
            Reason for selection: {selectedReason}
          </div>
          <button onClick={handleBackToClock} style={{ marginTop: '20px', padding: '10px', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Back to Clock
          </button>
        </DataCard>
      )}

      <button onClick={handleFetch} style={{ marginTop: '20px', padding: '10px', backgroundColor: '#003DF5', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
        Generate Classroom
      </button>
    </div>
  );
};

const DataCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 300px; /* Adjust the width here */
`;

export default ClassroomApp;
