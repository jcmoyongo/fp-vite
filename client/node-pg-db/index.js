import {getSchedule, createSchedule, updateSchedule, deleteSchedule, getScheduleBySeason} from './fp_model.js'
import express from 'express'
import bodyParser from 'body-parser'

const app = express()
const port = 3002

app.use(bodyParser.json())

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

/*pp.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});*/

app.get('/', (req, res) => {
  res.status(200).send('Franchise Players is running on port 3002!')
})

app.get('/schedule', getSchedule)
app.get('/schedule/:season', getScheduleBySeason)
app.post('/schedule', createSchedule)
app.put('/schedule', updateSchedule)
app.delete('/schedule/:season', deleteSchedule)



app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

//https://thecodebarbarian.com/nodejs-12-imports
//node --experimental-modules index.js 