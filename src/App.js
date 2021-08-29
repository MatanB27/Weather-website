import React, {useState} from 'react';

// Main page

const api = {
  key: '79eb640d1eed05dbcbf5f784f2fea112',
  base: 'https://api.openweathermap.org/data/2.5/'
}
function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  
  const search = async (event) => {
    console.log(query);
    if(event.key === 'Enter'){ // If enter is pressed
      const response = await fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      const json = await response.json();
      setWeather(json);
      setQuery('');
    }
  }
  const dateBuilder = (date) => {
    let months = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'
  ,'Saturday'];
    let day = days[date.getDay()];
    let numInMonth = date.getDate();
    let month = months[date.getMonth()];
    let year = date.getFullYear();

    return `${day}, ${numInMonth} ${month} ${year}`;
  } 

  return (
    <div className="app">
      <main>
        <div className='search-box'>
          <input placeholder='Search...' 
          type="text" className='search-bar'
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}>
          </input>
        </div>       
        {( typeof weather.main != "undefined") ? (
          <div>
            <div className='location-box'>
          <div className='location'>{weather.name}, {weather.sys.country}</div>
          <div className='date'>{dateBuilder(new Date())}</div>
        </div>  
        <div className='weather-box'>
          <div className='temp'>{Math.floor(weather.main.temp)}°</div>
          <div className='weather'>{weather.weather[0].description}</div>
        </div>
            <img className='icon'
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            />
          </div>
        ) : ('')};
        
      </main>
    </div>
  );
}

export default App;
