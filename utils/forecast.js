const request = require('request')

const url = 'https://api.darksky.net/forecast/d512b7548b816c7d7e7207fde56a2788/'

const forecast = (long, lat, callback) => {
    request({ url: `${url}${lat},${long}`, json: true }, (error, response) => {
        if (error) {
            callback('Unable to reach weather service. Check connection', undefined)
        } else {
            const data = response.body.currently
            const day = response.body.daily.data[new Date().getDay()]
            callback(undefined, {
                temperature: data.temperature,
                feelsLike: data.apparentTemperature,
                precip: data.precipProbability,
                tempHigh: day.temperatureHigh,
                tempLow: day.temperatureLow,
                summary: day.summary,
            })
        }
    })
}

module.exports = forecast