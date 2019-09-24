console.log('woowoo')

const weatherForm = document.querySelector('form')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const location = document.querySelector('.location-select').value
    document.querySelector('#location-name').textContent = 'Loading...';
    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        console.log(response)
        response.json().then((data) => {
            console.log(data)
            document.querySelector('#location-name').textContent = data.location;
            document.querySelector('#location-forecast').textContent = data.forecast;
        })
    })
})