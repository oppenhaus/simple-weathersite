const weatherForm = document.querySelector('form')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const location = document.querySelector('.location-select').value
    document.querySelector('#location-name').textContent = 'Loading...';
    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            document.querySelector('#location-name').textContent = data.location;
            console.log(data)
            document.querySelector('#location-forecast').textContent = `Daily Summary: ${data.forecast.summary}`
            document.querySelector('#location-details').textContent = `
            It currently feels like ${data.forecast.feelsLike} degrees with a high and low today of ${data.forecast.tempHigh} and ${data.forecast.tempLow}.`;
        })
    })
})