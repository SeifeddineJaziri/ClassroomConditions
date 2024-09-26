import React, { useState } from 'react';

const classroomsData = [
  { number: 101, humidity: 55, noise: 40, luminance: 300, temperature: 25, time: '08:00', date: '2024-08-01', occupied: false, students: 25, tutor: 'Dr. Alice Smith', subject: 'Mathematics', reason: 'Ideal temperature and luminance for morning sessions.' },
  { number: 102, humidity: 60, noise: 45, luminance: 280, temperature: 24, time: '09:00', date: '2024-08-01', occupied: true, students: 30, tutor: 'Prof. John Doe', subject: 'Physics', reason: 'Moderate humidity and quieter atmosphere suitable for focused learning.' },
  { number: 103, humidity: 50, noise: 42, luminance: 320, temperature: 26, time: '10:00', date: '2024-08-02', occupied: false, students: 20, tutor: 'Ms. Emily Johnson', subject: 'Chemistry', reason: 'Perfect for lab work due to excellent luminance and temperature.' },
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
  const [selectedClassroom, setSelectedClassroom] = useState(null);
  const [hour, setHour] = useState(8);
  const [minute, setMinute] = useState(0);
  const [showClock, setShowClock] = useState(true);

  // Handle time change
  const handleTimeChange = (e) => {
    const timeString = e.target.value;
    setInputTime(timeString);

    const [newHour, newMinute] = timeString.split(':').map(Number);
    setHour(newHour);
    setMinute(newMinute);
  };

  // Handle date change
  const handleDateChange = (e) => {
    setInputDate(e.target.value);
  };

  // Filter classrooms by both time and date
  const handleGenerateClassroom = () => {
    const filteredClassroom = classroomsData.find(
      (classroom) => classroom.time.startsWith(inputTime) && classroom.date === inputDate
    );
    setSelectedClassroom(filteredClassroom);
    setShowClock(false);
  };

  // Handle Back to Clock button
  const handleBackToClock = () => {
    setShowClock(true);
    setSelectedClassroom(null);
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
          <label style={{ fontSize: '16px', marginRight: '10px', color: 'black' }}>Enter Time (HH:MM):</label>
          <input
            type="time"
            value={inputTime}
            onChange={handleTimeChange}
            style={{
              padding: '5px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              fontSize: '14px',
            }}
          />
        </div>

        {/* Date Input */}
        <div>
          <label style={{ fontSize: '16px', marginRight: '10px', color: 'black' }}>Enter Date:</label>
          <input
            type="date"
            value={inputDate}
            onChange={handleDateChange}
            style={{
              padding: '5px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              fontSize: '14px',
            }}
          />
        </div>

        {/* Generate Classroom Button */}
        <button
          onClick={handleGenerateClassroom}
          style={{
            padding: '8px 16px',
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          Generate Classroom
        </button>
      </div>

      {/* Clock and Classroom Display */}
      {showClock ? (
        <RectangularClock hour={hour} minute={minute} />
      ) : (
        <div style={{ marginTop: '30px', width: '60%' }}>
          <button
            onClick={handleBackToClock}
            style={{
              padding: '6px 12px',
              backgroundColor: '#28A745',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            Back to Clock
          </button>
          {selectedClassroom ? (
            <div style={{
              marginTop: '20px',
              padding: '20px',
              backgroundColor: '#f9f9f9',
              borderRadius: '10px',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
              textAlign: 'left',
              color: '#333',
            }}>
              <h3>Classroom {selectedClassroom.number}</h3>
              <p>Subject: {selectedClassroom.subject}</p>
              <p>Temperature: {selectedClassroom.temperature}°C</p>
              <p>Humidity: {selectedClassroom.humidity}%</p>
              <p>Tutor: {selectedClassroom.tutor}</p>
              <p>{selectedClassroom.occupied ? 'Occupied' : 'Not occupied'}</p>
              <p>Reason: {selectedClassroom.reason}</p>
            </div>
          ) : (
            <p>No classroom available at this time and date.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ClassroomApp;
