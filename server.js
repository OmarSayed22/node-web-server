const express = require('express');
const fs = require('fs');

var app = express();

const hbs = require('hbs');
app.set('view engine', 'hbs');

hbs.registerPartials(__dirname+'/views/partials')

hbs.registerHelper('getCurrentYear', ()=>{
     return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase();
})
// middleware

app.use((req, res, next)=>{

    var now = new Date().toString();

    var log=`${now}:${req.method} ${req.url}`;

    console.log(log);

    fs.appendFile('server.log', log +'\n',(err)=>{
if (err) {
            console.log(`Append File Error: ${err}`)
    
}    });

    next();
})

app.use((req, res, next) => {
    res.render('maintenance.hbs');
})

app.use(express.static(__dirname + '/public'));


app.get('/', (req, res) => {
    // res.send('<h1>Hello, Express!<h1>');
    res.send(
        {
            name: 'omar',
            likes: ['reading', 'programming', 'serching']
        }
    );
});
app.get('/about', (req, res) => {
    res.render('about.hbs',{
        pageTitle: 'About Page',

    })
});

app.get('/home', (req, res) => {
    res.render('home.hbs',{
        welcomeMessage: 'Welcome to my website',
        pageTitle: 'Home Page',
    })
});
app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle this request'
    })
});

app.listen(3000, function () {
    console.log(new Date().toISOString() + ": server started on port 3000");
});