let args = process.argv.slice(2);
const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});
const queryString = `
SELECT students.id, students.name, cohorts.name AS cohort
FROM students
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE $1
LIMIT $2;
`;

const values = [`%${args[0]}%`, `${args[1]}`];

console.log(values);
pool.query(queryString, values)
  .then(res => {
    res.rows.forEach(user => {
      console.log(`${user.name} has an id of ${user.id} and was in the ${user.cohort} cohort`);
    
    });
    pool.end();
  })
  .catch(err => console.error('query error', err.stack));