const path = require("path")
const express = require("express")
const hbs = require("hbs")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")
// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000
//setup handlebars and views
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templates/views'))
hbs.registerPartials( path.join(__dirname, '../templates/partials' ))

//setup static directory
app.use(express.static(path.join(__dirname, '../public')))


app.get('', (req, res)=>{
    res.render('index', {
        title:"Weather-App",
        name:"Heisenberg"
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: "About Me",
        name: "Heisenberg"
    })
})

app.get('/help', (req, res)=>{
    res.render('help',{
        message:"Help Me",
        title:"Help",
        name:"Heisenberg"
    })
})
app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error:"You Must provide an address"
        })
    }
    const address = req.query.address
    geocode(address, (error, {latitude, longitude, location}= {})=>{
        if(error){
            return res.send({
                error:"Unable to find location. Try another words"
            })
        }
       //console.log(data)
       forecast(latitude, longitude, (error, forecastData)=>{
           if(error){
               return res.send({
                error:"Unable to find location. Try another words"
               })
           }

           return res.send({
               location,
               forecast: "It is currently "+ (forecastData.temperature).toString()+" degrees out.",
               description:" Feels like "+ (forecastData.description[0]).toString()
           })
           //console.log(location)
           //console.log(forecastData)
       })
    })
})

app.get('/products', (req, res)=>{
    if(!req.query.rating){
        return res.send({
            error:"You Must provide a search term"
        })
    }
    console.log(req.query.rating)
    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404page', {
        message:"Help Article Not Found",
        name:"Rick"
    })
})

app.get('*', (req, res)=>{
    res.render('404page', {
        message:"Error 404: Page Not Found!",
        name:"Rick"
    })
})

app.listen(port, ()=>{
    console.log("Server is up on port "+ port)
})