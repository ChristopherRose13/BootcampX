let args = process.argv.slice(2);
const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

pool.query(`
SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
FROM teachers
JOIN assistance_requests ON teacher_id = teachers.id
JOIN students ON student_id = students.id
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name LIKE '%${args[0]}%'
ORDER BY teacher;
`)
  .then(res => {
    res.rows.forEach(user => {
      console.log(`${user.cohort} : ${user.teacher} `);
    });
  })
  .catch(err => console.error('query error', err.stack));