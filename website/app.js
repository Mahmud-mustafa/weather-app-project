// Personal API Key for OpenWeatherMap API
apiKey = '282a39ca1c7fc683a446e7bca2c1e188';
//Helper function
const getId = (id)=>{
    return(document.getElementById(id));
}
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
//HTML DOM element
button = getId('generate');
// Event listener to add function to existing HTML DOM element
button.addEventListener('click',onClick);
/* Function called by event listener */
async function onClick(){
    zipCode = getId('zip').value;
    getWeather(apiKey,zipCode).then((data)=>{
        postData('/postData',data);
    })
    .then(()=>{
        getData('/getData').then((data)=>{
            update(data);
        })
    })
}
function update(bit){
    const weather = bit;
getId('temp').innerHTML =`Temprature = ${weather.temp}°C`;
getId('humidity').innerHTML =`Humidity = ${weather.humidity}%`;
getId('date').innerHTML = newDate;
if(getId('feelings').value)
  getId('content').innerHTML = `You're feeling ${getId('feelings').value}`;
}
/* Function to GET Web API Data*/
async function getWeather(key,zip){
    try{
        const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=metric`;
        const res = await fetch(url);
        const weather = await res.json();
        return weather;
    }
    catch(error){
        console.log("Error! :",error);
    }
}
/* Function to POST data */
async function postData(url,send){
const response = await fetch(url, {
    method: 'POST',
    credentials:'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    // converting data to json
    body: JSON.stringify(send)
})
try{
    res = await response.json();
    console.log(res);
    return(res);
}
catch(error){
    console.log('Error!: ',error);
}  
}

/* Function to GET Project Data */
const getData = async (url)=>{
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return(data);
  }
