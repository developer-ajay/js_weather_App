const apiKey="2122ddcfccbb3a4b1cd17bdca7b9c889"
const apiUrl="https://api.openweathermap.org/data/2.5/weather?q=berlin&units=metric" 

async function checkWeather(){
  const response = await fetch(apiUrl + `&appid=${apiKey}`);
  var data = await response.json();

  console.log(data);
  
}

checkWeather();
