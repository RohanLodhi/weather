const city = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const span = document.querySelector('.span');
const time = document.querySelector('img');
const icon = document.querySelector('.icon img');
const loader = document.querySelector('.loader')

const updateUI = (data) => {

  const {cityDetails, weather} = data;

  loader.classList.add('display')

  details.innerHTML = `
    <h2>${cityDetails.EnglishName}</h2>
    <h5>${weather.WeatherText}</h5>
  `;
  span.innerHTML = `
    <span>${weather.Temperature.Metric.Value}</span>
    <span>&deg;C</span>
  `;

  const iconSrc = `imgs/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute('src', iconSrc);

  let timeSrc = null;
  if(weather.IsDayTime){
    timeSrc = 'imgs/day.svg';
  } else {
    timeSrc = 'imgs/night.svg';
  }
  time.setAttribute('src', timeSrc);

  if(card.classList.contains('display')){
    card.classList.remove('display');
  }
}
const updateCity = async city =>{
    const cityDetails = await getCity(city);
    const weather = await getWeather(cityDetails.Key);

    return {cityDetails, weather};
}

city.addEventListener('submit', e => {
    e.preventDefault();
    loader.classList.remove('display')

    const cityValue = city.city.value.trim()
    city.reset();

    updateCity(cityValue)
        .then(data => updateUI(data))
        .catch(error => console.log(error))
})