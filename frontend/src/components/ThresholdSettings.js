import React, { useState } from 'react';
import styled from 'styled-components';

const SettingsWrapper = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto; 
  font-family: 'Poppins', sans-serif;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 24px;
  font-family: 'Poppins', sans-serif;
  text-align: center;
  margin-bottom: 30px;
`;

const SettingBlock = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-size: 16px;
  color: #333;
  margin-bottom: 8px;
`;

const Slider = styled.input`
  width: 100%;
  height: 8px;
  border-radius: 5px;
  background: ${({ dangerLevel }) => 
    dangerLevel >= 75 ? '#ff9999' : 
    dangerLevel >= 50 ? '#fff099' : 
    '#d3d3d3'}; 
  outline: none;
  transition: background 0.3s ease-in-out;
  -webkit-appearance: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    background: ${({ dangerLevel }) => 
      dangerLevel >= 75 ? '#ff6666' : 
      dangerLevel >= 50 ? '#ffcc00' : 
      '#007bff'};
    border-radius: 50%;
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    background: ${({ dangerLevel }) => 
      dangerLevel >= 75 ? '#ff6666' : 
      dangerLevel >= 50 ? '#ffcc00' : 
      '#007bff'};
    border-radius: 50%;
    cursor: pointer;
  }

  &:active {
    background: ${({ dangerLevel }) => 
      dangerLevel >= 75 ? '#ff666644' : 
      dangerLevel >= 50 ? '#ffcc0044' : 
      '#007bff44'};
  }
`;

const Value = styled.span`
  font-size: 16px;
  color: #007bff;
  font-weight: bold;
  float: right;
`;

const SaveButton = styled.button`
  display: block;
  width: 100%;
  background-color: #007bff;
  color: white;
  font-size: 18px;
  padding: 10px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #0056b3;
  }

  &:focus {
    outline: none;
  }
`;

const ThresholdSettings = () => {
  const [humidity, setHumidity] = useState(60); 
  const [temperature, setTemperature] = useState(30); 
  const [luminance, setLuminance] = useState(300);
  const [noise, setNoise] = useState(50); 

  const handleSubmit = () => {
    console.log("New Thresholds", { humidity, temperature, luminance, noise });
  };

  const getDangerLevel = (value, max) => (value / max) * 100; // Calculate danger level as percentage

  return (
    <SettingsWrapper>
      <Title>Threshold Settings</Title>

      <SettingBlock>
        <Label>Humidity Threshold</Label>
        <Slider
          type="range"
          min="0"
          max="100"
          value={humidity}
          onChange={(e) => setHumidity(e.target.value)}
          dangerLevel={getDangerLevel(humidity, 100)} 
        />
        <Value>{humidity}%</Value>
      </SettingBlock>

      <SettingBlock>
        <Label>Temperature Threshold</Label>
        <Slider
          type="range"
          min="0"
          max="50"
          value={temperature}
          onChange={(e) => setTemperature(e.target.value)}
          dangerLevel={getDangerLevel(temperature, 50)} 
        />
        <Value>{temperature}°C</Value>
      </SettingBlock>

      <SettingBlock>
        <Label>Luminance Threshold</Label>
        <Slider
          type="range"
          min="100"
          max="1000"
          value={luminance}
          onChange={(e) => setLuminance(e.target.value)}
          dangerLevel={getDangerLevel(luminance, 1000)} 
        />
        <Value>{luminance} lux</Value>
      </SettingBlock>

      <SettingBlock>
        <Label>Noise Threshold</Label>
        <Slider
          type="range"
          min="0"
          max="100"
          value={noise}
          onChange={(e) => setNoise(e.target.value)}
          dangerLevel={getDangerLevel(noise, 100)} 
        />
        <Value>{noise} dB</Value>
      </SettingBlock>

      <SaveButton onClick={handleSubmit}>Save Thresholds</SaveButton>
    </SettingsWrapper>
  );
};

export default ThresholdSettings;
