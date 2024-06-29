

let FindBtn = document.querySelector("#Find")
let searchInput = document.querySelector("#searchInput")

let TodayDate = document.querySelector("#today")
let TodayTemp = document.querySelector("#heatindex_C")
let TodaycityName = document.querySelector("#cityName")
let TodayImage = document.querySelector("#Today-image")
let todayWindDir = document.querySelector("#todayWindDir")
let todayHumidity = document.querySelector("#todayHumidity")
let todayWind_kph = document.querySelector("#todayWind_kph")
let TodayDateNumber = document.querySelector("#TodayDateNumber")
let TodayWeatherCondition = document.querySelector("#WeatherCondition")

let NextDay = document.getElementsByClassName("NextDay")
let nextDayImage = document.getElementsByClassName("nextDayImage")
let nextDayMinDeg = document.getElementsByClassName("nextDayMinDeg")
let nextDayMaxDeg = document.getElementsByClassName("nextDayMaxDeg")
let nextDayWeatherCondition = document.getElementsByClassName("nextDayWeatherCondition")




getlocationUser()


// start App 
async function startApp(searchData = "cairo") {

   let weatherData = await getWeatherCountry(searchData)
   if (!weatherData.error) {
      displayTodayData(weatherData)
      displayNextDayData(weatherData)
   }

}
// Fetch API
async function getWeatherCountry(cityName) {

   var res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=efee43a4d17e4f49a5e153453241106&q=${cityName}&days=3`);
   var finalresult = await res.json()
   return finalresult
}
// display Today Data
function displayTodayData(data) {
   let todayDate = new Date();
   TodayDate.innerHTML = todayDate.toLocaleDateString("en-US", { weekday: "long" })
   TodayDateNumber.innerHTML = `${todayDate.getDate()} ${todayDate.toLocaleDateString("en-US", { month: "long" })}`;

   TodaycityName.innerHTML = data.location.name;
   TodayTemp.innerHTML = data.current.temp_c;
   TodayImage.setAttribute("src", data.current.condition.icon)
   TodayWeatherCondition.innerHTML = data.current.condition.text
   todayHumidity.innerHTML = `${data.current.humidity}%`
   todayWind_kph.innerHTML = `${data.current.wind_kph}km/h`
   todayWindDir.innerHTML = data.current.wind_dir
}
// display NextDay Data
function displayNextDayData(data) {
   let forecastData = data.forecast.forecastday;
   for (let i = 0; i < 2; i++) {

      let nextDate = new Date(forecastData[i + 1].date);
      NextDay[i].innerHTML = nextDate.toLocaleDateString("en-US", { weekday: "long" })

      nextDayMaxDeg[i].innerHTML = `${forecastData[i + 1].day.maxtemp_c}°c`;
      nextDayMinDeg[i].innerHTML = `${forecastData[i + 1].day.mintemp_c}°c`;
      nextDayImage[i].setAttribute("src", forecastData[i + 1].day.condition.icon);
      nextDayWeatherCondition[i].innerHTML = forecastData[i + 1].day.condition.text
   }
}
// get cityName from getlocation by use (latitude,longitude)
function getlocationUser() {
   if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async function (pos) {
         let latitude = pos.coords.latitude
         let longitude = pos.coords.longitude
         let cityName = await getCityNameFromGeoloction(latitude, longitude)
         startApp(cityName)
      })
   }
   else {
      alert("Your pc not support geolocation  ")
   }
}
// get city name
async function getCityNameFromGeoloction(latitude, longitude){
   const apiKey = 'b44d1dc21ffe4df5b558aab7317643a0';
   const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;
   let data = await fetch(apiUrl)
   let resultApi = await data.json()
   return resultApi.results[0].components.city
}
searchInput.addEventListener("keyup", () => {
   let searchData = searchInput.value
   startApp(searchData)
})
FindBtn.addEventListener("click", () => {
   let searchData = searchInput.value
   startApp(searchData)
})


