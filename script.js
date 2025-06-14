
const  weatherApi={
    key:"e9b641a35b5300d634995966858c6fcf",


    baseurl:  "https://api.openweathermap.org/data/2.5/weather",}


let inputText =document.getElementById('input-box');
let errorDiv =document.getElementById('error-message');
let button=document.getElementById('button');
let temp=document.getElementById('temp');
let city=document.getElementById('city');
let date=document.getElementById('date');
let min_max=document.getElementById('min-max');
let weather=document.getElementById('weather');
let humidity=document.getElementById('humidity');
let wind=document.getElementById('wind');
let pressure=document.getElementById('pressure');
let weather_body=document.getElementById('weather-body');

inputText.addEventListener("keypress",async (event)=>{
    if(event.key==='Enter'){
       await getWeatherReport(event.target.value);
    }
});
button.addEventListener("click",async()=>{

        await getWeatherReport(inputText.value);

});


async function getWeatherReport(value){
    try{
        const response = await fetch ( `${weatherApi.baseurl}?q=${value}&appid=${weatherApi.key}&units=metric` );
if(!response.ok){
    throw new Error("City could not be found.");
    
}
      const data =await response.json();
       showWeatherInput(data);
       console.log(data);
      weather_body.classList.remove('d-none');
      errorDiv.classList.add('d-none');
    }
    catch(error){
        weather_body.classList.add('d-none');
        errorDiv.classList.remove('d-none');
        console.log(error);

    }
}
function showWeatherInput(data){
    city.innerText=`${data.name},${data.sys.country}`;
    date.innerText= formatdate(new Date());
  
    temp.innerHTML=`${Math.round(data.main.temp)}&deg;C`;
    weather.innerText=`${data.weather[0].main}`;
    min_max.innerHTML=`${Math.floor(data.main.temp_min)}&deg;C(min)/${Math.floor(data.main.temp_max)}&deg;C(max)`;
    humidity.innerText=`${data.main.humidity}`;
    wind.innerText=`${data.main.speed} kmph`;
    pressure.innerText=`${data.main.pressure}hPa`;
    updateBackground(data.weather[0].main);
}
function formatdate(date){
   return date.toLocaleDateString(undefined,{
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'

    });

}
function updateBackground(weathertype){
    const background={
       Clear:"images/clear.jpg",
       Cloud:"images/clouds.jpg",
        Clouds:"images/clouds.jpg",
        Rain:"images/rain.webp",
        Haze:"images/clouds.jpg",
        Thunder:"images/thunder.jpg",
        Sunny:"images/sunny.jpg",
        Snow:"images/snow.jpg",
        
        
        
        
    };
    document.body.style.backgroundImage=`url(${background[weathertype]||"clear.jpg"})`;
}
function clearWeatherReport(){
    city.innerText="";
    temp.innerHTML="";
    weather.innerHTML="";
    humidity.innerHTML="";
    wind.innerHTML="";
        
    pressure.innerHTML="";
    weather_body.innerHTML="";
    humidity.innerHTML="";
    wind.innerHTML="";
    pressure.innerHTML="";
    weather_body.innerHTML="";
    
    
}