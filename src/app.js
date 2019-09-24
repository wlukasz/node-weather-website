const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { geocode, ownGeocode } = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Wojtek L.'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Wojtek L.'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is an example of an unhelpful HELP message.',
        title: 'Help',
        name: 'Wojtek L.'
    })
})

app.get('/weather/own', (req, res) => {
    ownGeocode(req.query.lat, req.query.lon, (error, { longitude, latitude, location } = {}) => { // data is destructured here into lon, lat & location
        if (error) {
            return res.send({
                error: error //function stops
            })
        }

        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error // shorthand notation (same name), function stops
                })
            }
        
            res.send({
                forecast: forecastData,
                location, //shorthand
                address: req.query.address
            })
        })
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
         return res.send ({ // this exits the function preventing attempt to send header twice
            error: 'You must provide an address for the forecast'
        })
    }

    geocode(req.query.address, (error, { longitude, latitude, location } = {}) => { // data is destructured here into lon, lat & location
        if (error) {
            return res.send({
                error: error //function stops
            })
        }

        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error // shorthand notation (same name), function stops
                })
            }
        
            res.send({
                forecast: forecastData,
                location, //shorthand
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        name: 'Wojtek L.',
        pageNotFound: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        name: 'Wojtek L.',
        pageNotFound: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Started the server on port ' + port)
}) 