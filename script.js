window.addEventListener("load", ()=> {
    let long;
    let lat;
    let temperatureDecsription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;

            var _0xe327=["\x34\x61\x37\x35\x36\x39\x61\x62\x62\x66\x38\x34\x65\x39\x38\x30\x31\x63\x61\x64\x36\x34\x34\x30\x35\x31\x33\x31\x34\x32\x32\x64"];let apiKey=_0xe327[0]
            
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/${apiKey}/${lat},${long}`;
     
            fetch(api)
            .then(data => {
                return data.json();
            })
            .then(data => {
                const {temperature, summary, icon} = data.currently;
                //Set DOM elemets from API
                temperatureDegree.textContent = Math.floor(temperature);
                temperatureDecsription.textContent = summary;
                locationTimezone.textContent = data.timezone;
                //Formula for celcius.
                let celcius = (temperature - 32) * (5 / 9);
                    //Set Icon
                    setIcons(icon, document.querySelector(".icon"));

                    //Change Temp to C/F.
                    temperatureSection.addEventListener("click", ()=> {
                        if(temperatureSpan.textContent === 'F'){
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = Math.floor(celcius);
                        }else{
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = temperature;
                        }
                    });
                });
            });
    }    

    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
}); 