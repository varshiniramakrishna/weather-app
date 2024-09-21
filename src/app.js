const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const port = process.env.PORT || 3000


//path modules
const publicdirectorypath = path.join(__dirname, '../public')
const viewspath = path.join(__dirname, '../template/views')
const partialspath = path.join(__dirname, '../template/partials')

app.use(express.static(publicdirectorypath))
//folder
app.set('view engine', 'hbs')
app.set('views', viewspath)
hbs.registerPartials(partialspath)

// app.get('/help', (req, res) => {
//     res.render('help.html')
// })

// app.get('/about', (req, res) => {
//     res.render('about.html')
// })

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Varshini R'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About this website',
        name: 'Varshini R'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        help: 'I am here to help',
        name: 'Varshini R'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Unable to search Address!'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastdata) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastdata,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/product', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'No items searched!!'
        })
    }
    res.send({
        products: [req.query.search]
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help Article Error',
        error: 'help article not found',
        name: 'Varshini R'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 page',
        error: 'this is 404 page!',
        name: 'Varshini R'
    })
})

app.listen(port, () => {
    console.log("Listening to port " + port)
})
