import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { css } from '@emotion/core';
import { CircleLoader, BeatLoader } from 'react-spinners';


const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;


function App() {
  const [WeatherObject, setWeatherObject] = useState(null)
  const GetLocation = () => {
    navigator.geolocation.getCurrentPosition( //get a Object location 
      (position) => { //function with agrument is 'position' = Object  
        let lati = position.coords.latitude;
        let longi = position.coords.longitude;
        GetData(lati, longi);
      }
    )
  };
  useEffect(() => {
    GetLocation();
  }, [])

  const GetData = async (lat, lon) => {
    const ApiKey = 'dafd49a4dae14cc48a33ddda7de729b5';
    let reponsive = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${ApiKey}&units=metric`)
    let data = await reponsive.json();
    setWeatherObject(data);
  }

  console.log('WeatherObject', WeatherObject);
  if (!WeatherObject) {
    return (
      <div>
        <div className='sweet-loading'>
          <CircleLoader
            css={override}
            sizeUnit={"px"}
            size={200}
            color={'#36D7B7'}
          />
          <div className={'loading'}>
            <h1 style={{ color: 'white' }}>Loading</h1>
            <BeatLoader
              css={override}
              sizeUnit={"px"}
              size={10}
              color={'white'}
            />
          </div>
        </div>
      </div>
    )
  }
  return (
    <div>
    <div className="container-fluid text-white my-auto App-header">
      <div className="container mx-auto my-4 py-4">
        <div className="row justify-content-center text-center">
          <h1 className="col-12 display-4 my-2 py-3 text-success">
            Awesome Weather App
          </h1>
          <h2 className="col-12">{WeatherObject && WeatherObject.name}</h2>
          <h3 className="col-12 text-danger">Temperature: {WeatherObject !== null && WeatherObject.main.temp}°C</h3>
          <h3 className="col-12">Weather Description: {WeatherObject !== null && WeatherObject.weather[0].description}</h3>
        </div>
      </div>
    </div>

<div className="waveWrapper waveAnimation">
        <div className="waveWrapperInner bgTop">
          <div className="wave waveTop" style={{backgroundImage: 'url("https://front-end-noobs.com/jecko/img/wave-top.png")'}} />
        </div>
        <div className="waveWrapperInner bgMiddle">
          <div className="wave waveMiddle" style={{backgroundImage: 'url("https://front-end-noobs.com/jecko/img/wave-mid.png")'}} />
        </div>
        <div className="waveWrapperInner bgBottom">
          <div className="wave waveBottom" style={{backgroundImage: 'url("https://front-end-noobs.com/jecko/img/wave-bot.png")'}} />
        </div>
      </div>
      </div>

  );
}

export default App;
