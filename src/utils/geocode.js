const request = require('request')
const geocode = (address, callback)=>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" +encodeURIComponent(address)+ ".json?access_token=pk.eyJ1Ijoicm9oaXRuYXdhbGUiLCJhIjoiY2s5N2Zya3ZvMTJsZDNmcnVtM3pucmFpNCJ9.1ngZqzXNqBKAGW30ml5Vcg&limit=1"

    request({url, json:true}, (error, response)=>{
        if(error){
            callback('Unable to connect to location services', undefined)
        }
        else if(response.body.features.length === 0){
            callback('Unable to find location. Please Try Again.')
        }
        else{
            callback(undefined, {
                latitude : response.body.features[0].center[1],
                longitude : response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode