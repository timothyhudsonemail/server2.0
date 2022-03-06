const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5001


const { Pool } = require('pg');
const pool = new Pool({
  connectionString: "postgres://jfbcmsmxfuibdv:e0d37b13f55dae52b68c64e2cb64978720b8d316089d7521cfc71d8393cbc10d@ec2-3-209-61-239.compute-1.amazonaws.com:5432/de79ujptm661em",
  ssl: {
    rejectUnauthorized: false
  }
});

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/a', (req, res) => res.render('pages/index'))
  .get('/db', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM newtable');
      const results = { 'results': (result) ? result.rows : null};
        //res.render('pages/db', results );
      console.log(results)
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
