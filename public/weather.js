// apiKey for OpenWeatherApp
const apiKey = '6956bf41ab61c418f6cde891de55a2cd';

const main = document.querySelector('main');

let city = '';

let response;

//on web app load event...
window.addEventListener('load', e => { 
    //updates the weather with a placeholder 'Cupertino' city... 
    updateWeather('Cupertino', 'US');
    //grabs the element by it's id and saves it in a variable...
    var submitBtn = document.getElementById('submitCity');
    //on click event for submit city btn...
    submitBtn.addEventListener('click', () => {
        //grab value and save it...
        city = document.getElementById('inputCity').value;
        //clear input box...
        console.log('City: ', city);

        updateWeather(city, 'US');

        document.getElementById('inputCity').value = "";
    });
});

async function updateWeather(cityname, countrycode) {
    const res = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityname},${countrycode}&APPID=${apiKey}`);
    const json = await res.json();


    console.log(json);

    response = json;

    main.innerHTML = displayWeather(response);
    // main.innerHTML = json.list.map(createWeather).join('\n');
}


function logging(element){
    console.log('Main Weather: ', element.main);
    console.log('Rain: ', element.rain);
    console.log('Weather: ', element.weather);
    console.log('Rain: ', element.wind);
}

function createWeather(list) {

    let template = `
        <div class='article'>
            <div id='city' data-id='${city.name}'>${city.name}</div>
            <div id='humidity'>Humidity: ${main.humidity}</div>
            <div>Temp: ${main.temperature} kelvin</div>
            <div>Weather: ${weather.description}</div>
            <div>Speed: ${wind.speed}</div>
        </div>
    `;

    return template

}

function displayWeather(resp){

    let f = tempConversion(resp.main.temp);
    let fmin = tempConversion(resp.main.temp_min);
    let fmax = tempConversion(resp.main.temp_max);

    let pic = weatherImage(resp.weather[0].main);

    console.log('pic', pic);

    windDirection(resp.wind.deg);

    let template = `
        <div class='row' id='weather-data'>
                <div id='city-name' data-id='${resp.name}'>${resp.name}</div>
                <div>${weatherImage(resp.weather[0].main)}</div>
                <div id='current-weather'>${resp.weather[0].main}</div>
                <div id='temp-current'>${f}&#8457</div>
                <div id='temp-min'>Low's ${fmin}&#8457</div>
                <div id='temp-max'>High's ${fmax}&#8457</div> 
                <div>Sunrise at ${msToTime(resp.sys.sunrise)} </div>
                <div>Sunset at ${msToTime(resp.sys.sunset)} </div>        
        </div>
    `

    return template;
}

function tempConversion(kelvin) {
    let f = Math.trunc((9/5)*(kelvin-273)+32);
    return f;
}

function weatherImage(imgType){
    console.log('Img type: ', imgType);
    if (imgType == 'Clear') {
        return `<img src='./images/sunny.png'></img>`;
    } else if (imgType == 'Mist') {
        return `<img src='./images/mist.png'></img>`
    } else if (imgType == 'Haze') {
        return `<img src='./images/haze.png'></img>`
    } else if (imgType == 'Clouds') {
        return `<img src='./images/clouds.png'></img>`
    }

    else {
        return null;
    }
}

function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
        seconds = parseInt((duration / 1000) % 60),
        minutes = parseInt((duration / (1000 * 60)) % 60),
        hours = parseInt((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes;
}

function windDirection(direction) {
    if (direction > 348.75 && direction <= 360 || direction >= 360 && direction <= 11.25) {
        console.log('Wind - North');
    } else if (direction > 11.25 && direction <= 33.75) {
        console.log('Wind North North East');
    } else if (direction > 33.75 && direction <= 56.25) {
        console.log('Wind North East');
    } else if (direction > 56.25 && direction <= 78.75) {
        console.log('Wind East North East');
    } else if (direction > 78.75 && direction <= 101.25) {
        console.log('Wind East');
    } else if (direction > 101.25 && direction <= 123.75) {
        console.log('Wind East South East');
    } else if (direction > 123.75 && direction <= 146.25) {
        console.log('Wind South East');
    } else if (direction > 146.25 && direction <= 168.75) {
        console.log('Wind South South East');
    } else if (direction > 168.75 && direction <= 191.25) {
        console.log('Wind South');
    } else if (direction > 191.25 && direction <= 213.75) {
        console.log('Wind South South West');
    } else if (direction > 213.75 && direction <= 236.25) {
        console.log('Wind South West');
    } else if (direction > 236.25 && direction <= 258.75) {
        console.log('Wind West South West');
    } else if (direction > 258.75 && direction <= 281.25) {
        console.log('Wind West');
    } else if (direction > 281.25 && direction <= 303.75) {
        console.log('Wind West North West');
    } else if (direction > 303.75 && direction <= 326.25) {
        console.log('Wind North West');
    } else if (direction < 326.25 && direction <= 348.75) {
        console.log('Wind North North West');
    }
}