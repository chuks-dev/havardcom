const weatherBtn = document.querySelector('#weather-btn');

weatherBtn.addEventListener('click', () => {
	navigator.geolocation.getCurrentPosition(position => {
		let lat = position.coords.latitude;
		let lon = position.coords.longitude;
		console.log.log(lat, lon);
		fetch(
			`api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=71490b444071195229aeecab8a054cd5`,
		)
			.then(response => {
				return response.json();
			})
			.then(data => {
				console.log(data);
			})
			.catch(err => {
				console.log(err);
			});
	});
});
