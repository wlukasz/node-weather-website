const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/63e4cdeb5736ed86d11157c16db86a17/' + latitude + ',' + longitude + '?units=si'    

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to fetch weather data!', undefined)
        } else if (body.error) {
            callback(body.error, undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. The minimum for the day is ' + body.daily.data[0].temperatureLow + ' degrees and maximum is ' + body.daily.data[0].temperatureHigh + '. There is ' + body.currently.precipProbability * 100 + '% chance of rain.')
        }
    })
}

module.exports = forecast