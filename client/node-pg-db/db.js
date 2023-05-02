import mysql from 'mysql'


export const db = mysql.createPool({
    connectionLimit:20,
    host: "sql654.main-hosting.eu",
    user: "u245209544_fp_admin",
    password: "Auclairdel@lun3",
    database:"u245209544_fp",
    port:'3306'
})

/*db.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
   
    console.log('connected as id ' + db.threadId);
});*/

db.query('SELECT 1+1 solution from u245209544_fp.schedule', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
});
//https://dev.to/nasreenkhalid/simple-react-js-and-mysql-integration-crud-app-backend-5aom

const getSchedule = (request, response)  => {
   
      db.query('SELECT * from u245209544_fp.schedule', (error, results) => {
        if (error) {
          console.log(error.message) 
        }

      })
}
//getSchedule();
//const results = getSchedule();
//console.log(results)