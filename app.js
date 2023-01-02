const express = require('express')
const router = express.Router()
const path = require('path')
const url = require('url')
const cors = require('cors')
const { rsponse } = require('express')

const port = 9000;

const app = express();
app.use(express.static(path.join('.', '/')));

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))


app.get('/index.html' , (req, resp) => {
    resp.writeHead(201);
})

app.get('/datetime', (req, resp) => {
    const time = new Date
    resp.writeHead(200)
    resp.end(`${time}`)
})

app.get('/bigger', (req, resp) => {
    // http://localhost:9000/ bigger ? a = ? & b = ?
    console.log(req.url);
    console.log(req.query);

    const a = Number(req.query.a)
    const b = Number(req.query.b)    

    if (isNaN(a) && isNaN(b)) {
        resp.writeHead(400)
        resp.end(`a = ${req.query.a} and b = ${req.query.b} are not parameters`)
        return
    }
    if (a > b) {
        resp.writeHead(200)
        resp.end(`a = ${req.query.a} is bigger than b = ${req.query.b} `)
        return
    }
    else if (a == b) {
        resp.writeHead(200)
        resp.end(`a = ${req.query.a} are equal to b = ${req.query.b}`)
        return
    }
    else {
        resp.writeHead(200)
        resp.end(`b = ${req.query.b} is bigger than a = ${req.query.a}`)
        return
    }    

})

app.get('/targil', (req, resp) => {
    // http://localhost:9000/ targil ? a = ? & b = ? & sum =?
    console.log(req.url);
    console.log(req.query);

    const a = Number(req.query.a)
    const b = Number(req.query.b) 
    const sum = Number(req.query.sum)
    
console.log('hello');
    if (a + b == sum) {
        resp.sendFile(path.join(__dirname, 'correct.html'));
        return;
    }
    else  {
        resp.sendFile(path.join(__dirname, 'wrong.html'));
        return;
    }    

})

app.listen(port, () => {
    console.log(`listening to port ${port}`);
})