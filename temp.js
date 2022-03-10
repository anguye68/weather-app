import React, {useState} from 'react';
import './App.css';
const api = {
  key: "cc24f6664ce1217e4a536832ab298075",
  base: "https://api.openweathermap.org/data/2.5/"
}



function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [unit, setUnit] = useState("C");
  const [temp, setTemp] = useState(weather.main.temp);

  const oppositeUnit = unit === "F" ? "C" : "F";

  const convert = () => {
    if (unit === "C") {
      const newT = temp * 1.8 + 32;
      setTemp(Math.round(newT));
      setUnit(oppositeUnit);
    }

    if (unit === "F") {
      const newT = ((temp - 32) * 5) / 9;
      setTemp(Math.round(newT));
      setUnit(oppositeUnit);
    }
  };

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
        });
    }
  }
  return (
    <div className={(typeof weather.main != "undefined" ? ((weather.main.temp > 75) ? 'app-warm' : 'app') : 'app')}>
      <main>
        <div className="search-box">
          <input type="text" className="search-bar" placeholder="Search..." onChange={e => setQuery(e.target.value)} value={query} onKeyPress={search} />
        </div>
        {(typeof weather.main != "undefined" ) ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{new Date().toLocaleString('default', {weekday: "long", month: "long", day: "numeric", year: "numeric"})}</div>
          </div>
          <button onClick={convert}>Convert to {oppositeUnit}</button>
          <div className="weather-box">
            <div className="temp">15</div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
