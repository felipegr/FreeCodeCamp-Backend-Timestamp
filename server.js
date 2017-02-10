var express = require('express')
var chrono = require('chrono-node')
var dateFormat = require('dateformat');

var app = express()

app.get('/', function (req, res) {
    res.send('Please enter a date in the URL, like "/September 04 1979"')
})

app.get('/:dateString', function (req, res) {
    try {
        var convertedDate = chrono.parseDate(req.params.dateString)
        var output = {}
        var convertedTime = null
        var convertedDateStr = null
        
        if (convertedDate != null) {
            convertedTime = convertedDate.getTime()
            convertedDateStr = dateFormat(convertedDate, "longDate")
        }
        
        output.unix = convertedTime
        output.natural = convertedDateStr
        
        res.json(output)
    }
    catch (e) {
        res.send(500)
    }
})

app.listen(8080, function () {
    console.log('App listening on port 8080')
})