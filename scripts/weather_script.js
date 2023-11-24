function getCityOnLoad() {
	let res0 = document.cookie.split(';');
	let city = res0.filter((item) => item.includes('town='));
	if (city.length > 0) 
		return city[0].trim().substr('town='.length);	

	return 'Самара';
}

window.onload=update_weather_report(getCityOnLoad());

function onUpdateWeather() {
	const city = document.getElementById("id_city_input").value;
	if (city !== '')
		update_weather_report(city)
}

function update_weather_report(city) {
	const key = '577b3bd2eec54e5a84a1ae825e746783';
	const lang = 'ru';
	let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=${lang}&appid=${key}`;
    
	fetch(url)
		.then(response => {
		    console.log(response.status); // Will show you the status
		    if (!response.ok) {
		        throw new Error('город не найден');
		    }
		    
                    return response.json();
		})
		.then(obj => {
	        	        const icon_id = obj.weather[0].icon;
				const img_src = `https://openweathermap.org/img/wn/${icon_id}@2x.png`;
				document.getElementById("weather_icon").src = img_src
				document.getElementById("weather_desc_id").innerHTML=''+ obj.weather[0].main; 
				document.getElementById("temp_id").innerHTML='<b><i>'+ obj.main.temp + '°C</i></b> (мин. <b><i>' + 
					obj.main.temp_min + '°C</i></b>, макс. <b><i>' + obj.main.temp_max + '°C</i></b>, ощущается как <b><i>' + obj.main.feels_like + '°C</i></b>)'; 
				document.getElementById("wind_id").innerHTML='скорость <b><i>'+ obj.wind.speed + ' м/с</i></b>, направление <b><i>' + 
					obj.wind.deg + '°</i></b>'; 
				document.getElementById("clouds_id").innerHTML='<b><i>'+ obj.clouds.all + '%</i></b>'; 
				document.getElementById("title_id").innerHTML=`Погода в г. ${city}`;
				document.getElementById("id_city_input").value = city;

				document.getElementById("err_text").style.display = 'none';
				document.getElementById("weather_icon_group_id").style.display = 'block';
				document.getElementById("weather_details_group_id").style.display = 'block';
				
				document.cookie = `town=${city}`;
			})
	.catch( err => {
				document.getElementById("weather_icon_group_id").style.display = 'none';
				document.getElementById("weather_details_group_id").style.display = 'none';

				document.getElementById("err_text").innerHTML = 'Ошибка при выполнении запроса: '+ err.message; 
				document.getElementById("err_text").style.display = 'block';
		});
}
