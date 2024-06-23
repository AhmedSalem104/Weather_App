
let FindBtn = document.querySelector("#Find")
FindBtn.addEventListener("click", () => {
   getWeatherCountry()
})

async function getWeatherCountry() {
   let searchInput = document.querySelector("#searchInput")
   let cityName = document.querySelector("#cityName")
   console.log(searchInput.value)
   if (searchInput.value != "") {
      var res = await fetch(`https://api.weatherapi.com/v1/search.json?key=efee43a4d17e4f49a5e153453241106&q=${searchInput.value}`);
      var finalresult = await res.json()
      console.log(finalresult)
      cityName.innerHTML = finalresult[0].name
   }
}

async function getWeatherDays() {
   var res = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=efee43a4d17e4f49a5e153453241106&q=07112&days=7`);
   var finalresult = await res.json()
   console.log(finalresult)

   let dateToday = finalresult.forecast.forecastday[0].date
   let dateTommorow = finalresult.forecast.forecastday[1].date
   let dateAfterTommorow = finalresult.forecast.forecastday[2].date
   getDays(dateToday, dateTommorow, dateAfterTommorow)

   /*  let todayheatMaxTemp = Array.from(finalresult.current.last_updated)
      console.log(todayheatMaxTemp.splice(0,10).join("")) */


   let todayheatMaxTemp = finalresult.forecast.forecastday[0].day.maxtemp_c;
   let todayheatMinTemp = finalresult.forecast.forecastday[0].day.mintemp_c;
   let todayText = finalresult.forecast.forecastday[0].day.condition.text;

   let tommorowheatMaxTemp = finalresult.forecast.forecastday[1].day.maxtemp_c;
   let tommorowMinTemp = finalresult.forecast.forecastday[1].day.mintemp_c;
   let tommorowText = finalresult.forecast.forecastday[1].day.condition.text;

   let afterTommorowheatMaxTemp = finalresult.forecast.forecastday[2].day.maxtemp_c;
   let afterTommorowheatMinTemp = finalresult.forecast.forecastday[2].day.mintemp_c;
   let afterTommorowText = finalresult.forecast.forecastday[2].day.condition.text;

   let logo_today = finalresult.forecast.forecastday[0].day.condition.icon;
   let logo_Tommorow = finalresult.forecast.forecastday[1].day.condition.icon;
   let logo_AfterTommorow = finalresult.forecast.forecastday[2].day.condition.icon;



   let icon_today = document.querySelector("#logo_today")
   icon_today.setAttribute("src", logo_today)

   let heatMaxTemp = document.querySelector("#heatindex_C")
   let WeatherCondition = document.querySelector("#WeatherCondition")

   heatMaxTemp.innerHTML = `${todayheatMaxTemp}°C`
   WeatherCondition.innerHTML = `${todayText}`




   let icon_tommorow = document.querySelector("#logo_tommorow")
   icon_tommorow.setAttribute("src", logo_Tommorow)

   let TommorowMaxDeg = document.querySelector("#TommorowMaxDeg")
   TommorowMaxDeg.innerHTML = `${tommorowheatMaxTemp}°C`

   let TommorowMixDeg = document.querySelector("#TommorowMixDeg")
   TommorowMixDeg.innerHTML = `${tommorowMinTemp}°C`

   let WeatherConditionTommorow = document.querySelector("#WeatherConditionTommorow")
   WeatherConditionTommorow.innerHTML = tommorowText





   let icon_AfterTommorow = document.querySelector("#logo_AfterTommorow")
   icon_AfterTommorow.setAttribute("src", logo_AfterTommorow)

   let AfterTommorowMaxDeg = document.querySelector("#AfterTommorowMaxDeg")
   AfterTommorowMaxDeg.innerHTML = `${afterTommorowheatMaxTemp}°C`

   let AfterTommorowMinDeg = document.querySelector("#AfterTommorowMinDeg")
   AfterTommorowMinDeg.innerHTML = `${afterTommorowheatMinTemp}°C`

   let WeatherConditionAfterTommorow = document.querySelector("#WeatherConditionAfterTommorow")
   WeatherConditionAfterTommorow.innerHTML = afterTommorowText



}
function getDays(dateToday, dateTommorow, dateAfterTommorow) {
   let today = document.querySelector("#today")
   let dateTodayshourt = document.querySelector("#dateToday")
   let Tommorow = document.querySelector("#Tommorow")
   let afterTommorow = document.querySelector("#afterTommorow")
   let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

   let dateTodayObj = new Date(dateToday);
   let dateTodayResult = days[dateTodayObj.getDay()];

   let dateTommorowObj = new Date(dateTommorow);
   let dateTommorowResult = days[dateTommorowObj.getDay()];

   let dateAfterTommorowObj = new Date(dateAfterTommorow);
   let dateAfterTommorowResult = days[dateAfterTommorowObj.getDay()];


   today.innerHTML = dateTodayResult
   dateTodayshourt.innerHTML = ""

   Tommorow.innerHTML = dateTommorowResult
   afterTommorow.innerHTML = dateAfterTommorowResult
}

function getGeoLocation() {
   const successCallback = (position) => {
      const coord = position.coords;

      console.log(coord.accuracy);
      console.log(coord.latitude);
      console.log(coord.longitude);
   };

   const errorCallback = (error) => {
      console.log(error);
   };

   navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

}


getWeatherDays()
getGeoLocation()

