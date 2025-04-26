//Today's Card Variables:
let today = document.getElementById("today"),
  todayDate = document.getElementById("today-date"),
  cityLocation = document.getElementById("location"),
  countryLocation = document.getElementById("location-country"),
  todayDegree = document.getElementById("today-degree"),
  todayIcon = document.getElementById("today-icon"),
  description = document.getElementById("today-description"),
  humidty = document.getElementById("humidty"),
  wind = document.getElementById("wind"),
  compass = document.getElementById("compass"),
  searchBar = document.getElementById("search-bar");
footer = document.getElementById("footer");

let nextDay = document.getElementsByClassName("nextDay"),
  nextDayIcon = document.getElementsByClassName("nextDay-icon"),
  maxDegree = document.getElementsByClassName("max-degree"),
  minDegree = document.getElementsByClassName("min-degree"),
  nextDayDescription = document.getElementsByClassName("nextDay-description"),
  apiResponse,
  responseData,
  monthName = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Spet', 'Oct', 'Nov', 'Dec'],
  days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
const Links = [
  { link: "https://github.com/Mostafa3ta", icon: "fab fa-github" },
  { link: "https://www.linkedin.com/in/mostafa-mahmoud-33a1542b0", icon: "fab fa-linkedin-in" }
]

const socialItems = Links.map(item =>
  `<a href="${item.link}" target="_blank" rel='noopener noreferrer'>
      <i class="${item.icon} fs-4 mx-2"></i>
  </a>`).join(' ')
footer.innerHTML = socialItems




async function getWeatherData(currentCity = 'alexandria') {
  apiResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=572e08fb1d7547f58d8151525211205&q=${currentCity}&days=3`)
  responseData = await apiResponse.json()
  console.log(responseData)
  displayTodayWeather();
  displayNextDayWeather()
}
getWeatherData();



function displayTodayWeather() {

  let date = new Date();
  console.log(date)
  today.innerHTML = days[date.getDay()];
  todayDate.innerHTML = `${date.getDate()} ${monthName[date.getMonth()]}`;
  cityLocation.innerHTML = responseData.location.name;
  countryLocation.innerHTML = responseData.location.country;
  todayDegree.innerHTML = responseData.current.temp_c;
  todayIcon.setAttribute("src", `https:${responseData.current.condition.icon}`)
  description.innerHTML = responseData.current.condition.text;
  humidty.innerHTML = responseData.current.humidity;
  wind.innerHTML = responseData.current.wind_kph;
  compass.innerHTML = responseData.current.wind_dir;

}


function displayNextDayWeather() {
  for (let i = 0; i < nextDay.length; i++) {
    nextDay[i].innerHTML = days[new Date(responseData.forecast.forecastday[i + 1].date).getDay()];
    nextDayIcon[i].setAttribute('src', `https:${responseData.forecast.forecastday[i + 1].day.condition.icon}`)
    maxDegree[i].innerHTML = responseData.forecast.forecastday[i + 1].day.maxtemp_c;
    minDegree[i].innerHTML = responseData.forecast.forecastday[i + 1].day.mintemp_c;
    nextDayDescription[i].innerHTML = responseData.forecast.forecastday[i + 1].day.condition.text;
  }
}
searchBar.addEventListener("keyup", function () {
  currentCity = searchBar.value;
  console.log(currentCity);
  getWeatherData(currentCity);
})


