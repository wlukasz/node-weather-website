const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoid2x1a2FzeiIsImEiOiJjazA3dmtxejMwMGg0M2NrNW90Z2djdmh4In0.ATdJfJvYhVA1-Am2E3zjTQ&limit=1'

    request({ url, json: true }, (error, { body }) => { // response destructured into body
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Could not find requested location!', undefined)
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

const ownGeocode = (lat, lon, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + `${lon},${lat}` + '.json?access_token=pk.eyJ1Ijoid2x1a2FzeiIsImEiOiJjazA3dmtxejMwMGg0M2NrNW90Z2djdmh4In0.ATdJfJvYhVA1-Am2E3zjTQ&limit=1'

    request({ url, json: true }, (error, { body }) => { // response destructured into body
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Could not find requested location!', undefined)
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = { geocode, ownGeocode }