import * as express from 'express'
import fetch from 'node-fetch';
import * as dotenv from 'dotenv'

//env load
dotenv.config();

var querystring = require('querystring');
const app = express()

const host = process.env.SERVICE_HOST
const port = process.env.SERVICE_PORT
const redmine_url = process.env.REDMINE_URL
const redmine_key = process.env.REDMINE_KEY

app.get('/', async (req: express.Request, res: express.Response) => {

  // key = API KEY, id = Project Id
  const id = req.query.id as string
  // query param obj
  let qpo:{id?: string, key: string} = {key:redmine_key}

  if(id) qpo.id = id;
  
  //query params
  const qp = querystring.stringify(qpo)

  const url = `${redmine_url}/sys/fetch_changesets?${qp}`
  
  try {
    await fetch(url).then( fres => {
      const data = {
        status: fres.status,
        body: fres.text()
      }
      console.log(JSON.stringify(data));
      res.json(data);
    });
  } catch (error) {
    res.status(501)
    const data = {
      code: "FETCH_FAILED",
      message: error.message || "Unknown Error"
    }
    console.log(JSON.stringify(data));
    res.json(data);
  }
});

app.listen(port, () => {
  console.log(`app listening at ${host}:${port}`)
})