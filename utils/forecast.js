const request = require('request')

const url = 'https://api.darksky.net/forecast/d512b7548b816c7d7e7207fde56a2788/'

const forecast = (long, lat, callback) => {
    request({ url: `${url}${lat},${long}`, json: true }, (error, response) => {
        if (error) {
            callback('Unable to reach weather service. Check connection')
        } else {
            const data = response.body.currently
            callback(`It is currently ${data.temperature} degrees outside with a ${data.precipProbability}% chance of rain.`)
        }
    })
}

module.exports = forecast