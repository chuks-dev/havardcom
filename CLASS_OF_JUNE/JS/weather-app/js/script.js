const body = document.querySelector('body');
const loader = document.querySelector('#loader');
const weather = document.querySelector('.weather');

// body.addEventListener('load', () => {
// 	console.log('body loaded');
// });

function onBodyLoad() {
	getWeatherInfo();
}

function getWeatherInfo() {
	navigator.geolocation.getCurrentPosition(position => {
		let lat = position.coords.latitude;
		let lon = position.coords.longitude;
		console.log(lat, lon);
		fetch(
			`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=71490b444071195229aeecab8a054cd5`,
		)
			.then(response => {
				loader.remove();
				return response.json();
			})
			.then(data => {
				if (data.weather[0].main === 'Clear') {
					weather.style.background = "url('../img/bg-sun.jpg')";
					weather.style.backgroundSize = 'cover';
					weather.style.backgroundRepeat = 'no-repeat';
				}
			})
			.catch(err => {
				loader.remove();
				alert('Something went wrong, please try again');
				console.log(err);
			});
	});
}
