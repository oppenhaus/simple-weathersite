const request = require('request')

const geo_key = 'pk.eyJ1Ijoibm90LW9wcGVuaGVpbWVyIiwiYSI6ImNrMHNwNmlmMTAyM2ozb3JyOWJkcWE1cWkifQ.NEw4bJ3uGMQNwWKdTFnppw'
const geo_url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'

const geocode = (location, callback) => {
    request(
        {url: `${geo_url}${location}.json?access_token=${geo_key}&limit=1`, json: true},
        (error, response) => {
            if (error) {
                callback('Unable to connect to geocoding service', undefined)
            } else if (!response.body.features.length) {
                callback('Query yielded no results. Please check for typos.', undefined)
            } else {
                const [features] = response.body.features;
                const [lat, long] = features.center;
                callback(undefined, {
                    latitude: lat,
                    longitude: long,
                    location: features.place_name,
                });
            }
        }
    )
}

module.exports = geocode

