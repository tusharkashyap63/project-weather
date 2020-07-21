const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

async function getWeatherInfo() {
  try {
    document.getElementById('spinner').style.display = 'block';
    document.querySelector('.result').style.display = 'none';

    let location = document.getElementById('location').value;

    let request = new Request(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=48dd7789f547cbce47a83cadb7529e50`
    );
    let weatherData = await fetch(request).then((res) => res.json());

    // Rendering to DOM
    document.getElementById('temperature').innerHTML = `${(weatherData.main.temp - 273.15).toFixed(
      2
    )}<sup>o</sup>`;
    document.getElementById('description').textContent = weatherData.weather[0].main.toUpperCase();
    document.getElementById('humidity').innerHTML = `HUMIDITY: ${weatherData.main.humidity}%`;

    // Weather icon
    document.querySelector('.weather-icon>img').src = `images/${Math.trunc(
      weatherData.weather[0].id / 100
    )}.png`;
    if (weatherData.weather[0].id === 800) {
      document.querySelector('.weather-icon>img').src = `images/800.png`;
    }

    document.getElementById('locationInResult').textContent =
      weatherData.name + ', ' + weatherData.sys.country;
    const todaysDate = new Date();
    document.getElementById('day').textContent = dayNames[todaysDate.getDay()].toUpperCase();
    document.getElementById('date').textContent =
      monthNames[todaysDate.getMonth()].toUpperCase() + ' ' + todaysDate.getDate();

    document.getElementById('spinner').style.display = 'none';
    document.querySelector('.result').style.display = 'flex';
  } catch (error) {
    document.getElementById('spinner').style.display = 'none';
    console.log(error);
  }
}

document.getElementById('selectBtn').addEventListener('click', getWeatherInfo);
