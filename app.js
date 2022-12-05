const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemEl = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');

const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

const API_KEY = 'aa679ffec355a225d96cf94fce5c7a15';
setInterval(()=> {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour %12: hour;
    const minutes = time.getMinutes();
    const ampm = hour >=12 ? 'PM' : 'AM';

    timeEl.innerHTML = hoursIn12HrFormat + ':' + minutes + ' ' + `<span id="am-pm">${ampm}</span>`

    dateEl.innerHTML = days[day] + ', ' + date + ' ' + months[month];

}, 1000)

getWeatherData();
function getWeatherData(){
    navigator.geolocation.getCurrentPosition((success) =>{
        console.log(success);

        let {latitude, longitude} = success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`).then(res => res.json()).then(data =>{
            console.log(data);
            showWeatherData(data);
        })
    })
        fetch(`https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`).then(res => res.json()).then(data => {
            console.log(data);
            showWeatherData(data);
        })
}
function showWeatherData (data){
    let {humidity, pressure, sunrise, sunset, wind_speed} = data.current;

    currentWeatherItemEl.innerHTML = 
    `<div class="weather-items">
    <div>Humidity</div>
    <div>${humidity}</div>
</div>
<div class="weather-items">
    <div>Pressure</div>
    <div>${pressure}</div>
</div>
<div class="weather-items">
    <div>Wind Speed</div>
    <div>${sunrise}</div>
</div>
<div class="weather-items">
    <div>Wind Speed</div>
    <div>${sunset}</div>
</div>
<div class="weather-items">
    <div>Wind Speed</div>
    <div>${wind_speed}</div>
</div>

<div class = "weather-item">
       <div>sunrise</div>
       <div>${window.moment(sunrise* 1000).format('hh.mm a')}</div>
    </div>
         <div class = "weather-item">
         <div>sunset</div>
    <div>${window.moment(sunset* 1000).format('hh.mm a')}</div>
    </div>

    ;
    let otherDayForcast =''
    data.daily.forEach((day,idx)=>{
        if(idx==0){
            currentTempE1.innerHTML +=
            <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@4x.png" alt="weather-icon" class="w-icon">
            <div class="other">
                <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
                <div class="temp">Night - ${day.temp.night}&#176; C</div>
                <div class="temp">Day - ${day.temp.day} &#176; C</div>  
            </div>
        </div>


        }else{
             otherDayForcast +=
             <div class="weather-forecast-items">
                <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
                <img src="http://openweathermap.org/img/wn/${day weather[0].icon}@2x.png" alt="weather-icon" class="w-icon">
                <div class="temp">Night -${day.temp.night} &#176</div>
                <div class="temp">Day - ${day.temp.day}&#176</div>
            </div>
        }
    })
        wetherforecastE.innerHTML = otherDayForcast;
