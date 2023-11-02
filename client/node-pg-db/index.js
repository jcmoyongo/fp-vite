import {getSchedule, createSchedule, updateSchedule, deleteSchedule, getScheduleBySeason, upsertSchedule} from './fp_model.js'
import express from 'express'
import bodyParser from 'body-parser'
import compression from 'compression' //Compress HTTP response to reduce time
import helmet from 'helmet' //Sets appropriate HTTP headers to protect agains web vulnerabilities
import rateLimit from 'express-rate-limit' //Limit repeated requests to APIs and endpoints

const app = express()
const port = 3002
/*const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));*/

app.use(bodyParser.json())
app.use(compression())
app.use(helmet())

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10,
});
app.use(limiter)

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use((req, res, next) => {
  const corsWhitelist = ['https://localhost:5173','https://www.franchise-players.com'];

  if (corsWhitelist.includes(req.headers.origin)) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    //res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    req.bodyParser = bodyParser.json();
  }
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

/*
https://thecodebarbarian.com/nodejs-12-imports
node --experimental-modules index.js 
https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/deployment
https://www.linkedin.com/pulse/how-connect-express-react-comprehensive-guide-eslam-zaid/
https://dev.to/pixelrena/deploying-your-reactjs-expressjs-server-to-rendercom-4jbo
*/