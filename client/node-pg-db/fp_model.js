import {db} from './db.js' //https://dev.to/nasreenkhalid/simple-react-js-and-mysql-integration-crud-app-backend-5aom

/*import pg from 'pg'
//const Pool = pg.Pool();
const pool = new pg.Pool({
  user: 'fp_user',
  host: 'localhost',
  database: 'fp_vite',
  password: 'lo@ngo',
  port: 5432,
});*/

export const getSchedule = (request, response)  => {
      db.query('SELECT * from schedule', (error, results) => {
        if (error) {
          console.log(error.message) 
        }
        response.status(200).send(results)
      })
}

export const getScheduleBySeason = (request, response)  => {
  const season = parseInt(request.params.season)

  db.query('SELECT * from schedule WHERE season = ?', [season], (error, results) => {
    if (error) {
      console.log(error.message) 
    }
    response.status(200).send(results)
  })
}
/* Pass this json object in a POST body to call createSchedule
{
    "season":2023,
    "games": [
  {
    "GameEndDateTime": ...,
  }
}
*/
export const createSchedule = (request, response)  => {
    const {season, games} = request.body
    const jsonGames = JSON.stringify(games)

    db.query('INSERT INTO schedule (season, games) VALUES (?, ?)', [season, jsonGames], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`${season} season schedule added. ${results.affectedRows} rows.`)
    })
}

export const updateSchedule = (request, response) => {
  const {season, games} = request.body
  const jsonGames = JSON.stringify(games)

  db.query('UPDATE schedule SET games = ? WHERE season = ?',[jsonGames, season],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`${season} season updated.`)
    }
  )
}

export const deleteSchedule = (request, response) => {
  const season = parseInt(request.params.season)
  db.query('DELETE FROM schedule WHERE season = ?', [season], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`${season} season deleted. ${results.affectedRows} rows.`)
  })
}

