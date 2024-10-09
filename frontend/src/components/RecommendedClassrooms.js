import React, { useState } from 'react';
import Clock from './Clock';

const RecommendedClassrooms = () => {
  const [recommendedClassrooms, setRecommendedClassrooms] = useState([]);
  const [selectedTime, setSelectedTime] = useState({ hour: 0, minute: 0 });
  const [isTimeSelected, setIsTimeSelected] = useState(false);

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const handleButtonClick = async () => {
    const { hour, minute } = selectedTime;

    // Check if the time is selected
    if (!hour && !minute) {
      console.error('Please select a time before fetching recommendations.');
      return;
    }

    // Sending the selected time to the server
    const response = await fetch('http://localhost:8000/time', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        hour,
        minute,
      }),
    });

    if (!response.ok) {
      console.error('Failed to fetch classrooms:', response.status);
      return;
    }

    const data = await response.json();

    const recommended = data.filter(classroom => {
      const classroomHour = parseInt(classroom.time.split(':')[0], 10);
      const classroomMinute = parseInt(classroom.time.split(':')[1], 10);
      
      const isTimeMatching = classroomHour === hour && classroomMinute === minute;
      const isConditionGood = classroom.temperature < 25 && classroom.humidity < 50;

      return isTimeMatching && isConditionGood;
    });

    setRecommendedClassrooms(recommended);
    setIsTimeSelected(true);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <Clock onTimeChange={handleTimeChange} />

     

      {isTimeSelected && (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
          <h2>Recommended Classrooms</h2>
          {recommendedClassrooms.length > 0 ? (
            recommendedClassrooms.map(classroom => (
              <div
                key={classroom.number}
                style={{
                  width: '200px',
                  height: '300px',
                  perspective: '1000px',
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    transition: 'transform 0.6s',
                    transformStyle: 'preserve-3d',
                    cursor: 'pointer',
                  }}
                  className="card-inner"
                >
                  <div
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      backfaceVisibility: 'hidden',
                      backgroundColor: '#f9f9f9',
                      border: '1px solid #ccc',
                      borderRadius: '10px',
                      padding: '20px',
                      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                    }}
                    className="card-front"
                  >
                    <h3>Classroom {classroom.number}</h3>
                    <p>Recommended for its {classroom.temperature}°C temperature and {classroom.humidity}% humidity.</p>
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      backfaceVisibility: 'hidden',
                      backgroundColor: '#007BFF',
                      color: 'white',
                      border: '1px solid #ccc',
                      borderRadius: '10px',
                      padding: '20px',
                      transform: 'rotateY(180deg)',
                      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                    }}
                    className="card-back"
                  >
                    <p>Reason: {classroom.reason}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No recommendations for the selected time.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default RecommendedClassrooms;
