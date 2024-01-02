// First DAy Forcastion
let toDayIsDateName = document.getElementById("toDayIsDateName");//toDayIsDateName 1
let toDayisDateNumber = document.getElementById("toDayisDateNumber"); // 2toDayisDateNumber
let countryName = document.getElementById("countryName");//3 country
let currentTemp = document.getElementById("currentTemp");//4
let currentTempImage = document.getElementById("currentTempImage");//5 icon
let currentTempStatus = document.getElementById("currentTempStatus");//6 text
let currentRainForcast = document.getElementById("currentRainForcast");//7 humidity
let currentWindSpeed = document.getElementById("currentWindSpeed");//8 wind_kph
let currentWindCompass = document.getElementById("currentWindCompass");//9 wind_dir
// Second DAy Forcastion
let secondDayName = document.getElementById("secondDayName");
let secondDayStatusImage = document.getElementById("secondDayStatusImage");
let maxForSecondDay = document.getElementById("maxForSecondDay");
let minForSecondDay = document.getElementById("minForSecondDay");
let statusSecondDay = document.getElementById("statusSecondDay");

// Third DAy Forcastion
let thirdDayNAme = document.getElementById("thirdDayNAme");
let thirdDayImage = document.getElementById("thirdDayImage");
let ThirdDayForcatMax = document.getElementById("ThirdDayForcatMax");
let ThirdDayForcastMin = document.getElementById("ThirdDayForcastMin");
let thirdDayText = document.getElementById("thirdDayText");


let countriesNameInOptions = document.getElementById("countriesNameInOptions");
let searchInput = document.getElementById("searchInput");
let clearInputs = document.getElementById("clearInputs");


clearInputs.addEventListener("click",()=> {
  searchInput.value ="";
});

async function weather(callBack) {
  let data = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=20e5704fce1c4fb384b154738240101&q=${callBack}&days=7`);
  let res = await data.json();
  const d = new Date()
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  toDayIsDateName.innerHTML = days[d.getDay(res.location.localtime)];
  toDayisDateNumber.innerHTML = `${d.getDay(res.location.localtime)}${months[d.getMonth(res.location.localtime)]}`;
  countryName.innerHTML = res.location.country;
  currentTemp.innerHTML = `${res.current.temp_c}<sup>o</sup>C`;
  currentTempImage.setAttribute("src",`https:${res.current.condition.icon}`)
  currentTempStatus.innerHTML =res.current.condition.text;
  currentRainForcast.innerHTML =`${res.current.humidity}<span>%</span>`;
  currentWindSpeed.innerHTML =`${res.current.wind_kph} <span>km/h</span>`;
  currentWindCompass.innerHTML =res.current.wind_dir;

secondDayName.innerHTML = days[d.getDate(res.forecast.forecastday[1].date)+1];
secondDayStatusImage.setAttribute("src",`https:${res.forecast.forecastday[1].day.condition.icon}`);
maxForSecondDay.innerHTML = `${res.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C`;
minForSecondDay.innerHTML = `${res.forecast.forecastday[1].day.mintemp_c}<sup>o</sup>`;
statusSecondDay.innerHTML = res.forecast.forecastday[1].day.condition.text;

thirdDayNAme.innerHTML = days[d.getDate(res.forecast.forecastday[2].date)];
thirdDayImage.setAttribute("src",`https:${res.forecast.forecastday[2].day.condition.icon}`);
ThirdDayForcatMax.innerHTML = `${res.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>C`;
ThirdDayForcastMin.innerHTML = `${res.forecast.forecastday[2].day.mintemp_c}<sup>o</sup>`;
thirdDayText.innerHTML = res.forecast.forecastday[2].day.condition.text;

}



async function contriees() {
  let data = await fetch('https://restcountries.com/v3.1/all?fields=name,flags');
  let resConetires = await data.json();
  let final = "";
  for( let i = 0 ; i < resConetires.length ; i++){

    final +=  `<option value="${resConetires[i].name.common}">`;
  }
  countriesNameInOptions.innerHTML = final
}
contriees()

searchInput.addEventListener("input",()=>{
  weather(searchInput.value)
})
weather("Egypt")