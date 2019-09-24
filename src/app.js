const path = require('path')
const request = require('request')
const express = require('express')
const hbs = require('hbs')

const geocode = require('../utils/geocode')
const forecast = require('../utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Home Page',
        author: 'August'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        author: 'August',
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        message: 'Get your help here, hot and ready.',
        author: 'August',
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address to search.'
        })
    } else {
        geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
            if (error) {
                res.send({
                    forecast: error,
                    location: null,
                    address: req.query.address,
                })
            } else if (latitude) {
                forecast(latitude, longitude, (error, response) => {
                    res.send({
                        forecast: error || response,
                        location,
                        address: req.query.address,
                    });
                })
            };
        });
    }
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Error 404',
        message: 'Help article not found',
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: 'Error 404',
        message: 'Page Not Found',
    })
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})