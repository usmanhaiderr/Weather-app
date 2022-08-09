import React from 'react';
import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import './styles/landing.css';
import landingImg from '../src/assets/landing.jpeg';
import axios from 'axios';

const LandingPage = () => {
  const [input, setInput] = useState();
  const [wData, setWData] = useState();

  const getTime = new Date().toLocaleTimeString();

  const clicked = async () => {
    const weatherData = await axios({
      method: 'get',
      url: `https://weatherapi-com.p.rapidapi.com/current.json?q=${input}`,
      headers: {
        'X-RapidAPI-Key': 'a3087001ebmsh5315f2955d307d8p1d9df3jsn3e4bf0f2e400',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
      },
    });
    setWData(weatherData?.data);
  };

  const weekday = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ][new Date().getDay()];

  const dataTemp = wData?.current?.feelslike_c.toString();
  const splitted = dataTemp?.split('.');

  const weatherIcon = wData?.current?.condition?.icon;
  const iconWeather = weatherIcon?.split('//');

  return (
    <div style={{ display: 'flex' }}>
      <div>
        <img className="landingImg" src={landingImg} />
        <div className="weather_num">{wData ? splitted[0] : '--'}</div>
        <div className="weather_city">{wData ? wData?.location?.name : ''}</div>
        <div className="weather_day">{wData ? weekday : ''}</div>
        <div className="weather_mid">{wData ? '-' : ''}</div>
        <div className="weather_time">{wData ? getTime : ''}</div>
        {wData ? (
          <img className="weather_icon" src={`https://${iconWeather[1]}`} />
        ) : (
          ''
        )}
        <div className="weather_cond">
          {wData ? wData?.current?.condition?.text : ''}
        </div>
      </div>
      <div className="weather_left"></div>
      <input
        type="text"
        className="weather_sear"
        placeholder="Search here"
        onChange={(e) => setInput(e.target.value)}
      />
      <div onClick={clicked}>
        <div className="weather_searBack"></div>
        <div className="weather_searIcon">
          <BsSearch />
        </div>
      </div>
      <div className="weather_details">Weather Details</div>
      <div className="weather_det">Cloudy</div>
      <div className="weather_detCloud">
        {wData ? `${wData?.current?.cloud}%` : '--'}
      </div>
      <div className="weather_detail">Humidity</div>
      <div className="weather_detHum">
        {wData ? `${wData?.current?.humidity}%` : '--'}
      </div>
      <div className="weather_detailsW">Wind</div>
      <div className="weather_detWind">
        {wData ? `${wData?.current?.wind_mph}mph` : '--'}
      </div>
    </div>
  );
};

export default LandingPage;
