import {getSchedule, createSchedule, updateSchedule, deleteSchedule, getScheduleBySeason, upsertSchedule} from './fp_model.js'
import express from 'express'
import bodyParser from 'body-parser'

const app = express()
const port = 3002
/*const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));*/

app.use(bodyParser.json())

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  req.bodyParser = bodyParser.json();
  next();
})


app.get('/', (req, res) => {
  res.status(200).send('Franchise Players is running on port 3002!')
})

app.get('/schedule', getSchedule)
app.get('/schedule/:season', getScheduleBySeason)
app.post('/schedule', createSchedule)
app.put('/schedule', updateSchedule)
app.delete('/schedule/:season', deleteSchedule)
app.put('/schedule/merge', upsertSchedule)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

//https://thecodebarbarian.com/nodejs-12-imports
//node --experimental-modules index.js 