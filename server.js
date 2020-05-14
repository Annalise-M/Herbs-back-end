require('dotenv').config();

const client = require('./lib/client');

// Initiate database connection
client.connect();

const app = require('./lib/app');

const PORT = process.env.PORT || 3001;

//All Herbs
app.get('/herbs', async(req, res) => {
  const data = await client.query('SELECT * from herbs');

  res.json(data.rows);
});

//just ONE Herb
app.get('/herbs/:name', async(req, res) => {
  
  const name = req.params.name;
  console.log('name', name);
  const data = await client.query('SELECT * from herbs where name=$1', [name]);
  console.log('data', data);
  res.json(data.rows);
});

//app.post input 
// app.post();
//INSERTING (wire my form (admin) to post route)

app.put('/herbs/:id', async(req, res) => {
  try {
    const data = await client.query(`
    UPDATE herbs
    SET poisonous= TRUE
    WHERE id=$1
    RETURNING *`, [req.params.id]);
    res.json(data);
  } catch(e) {
    res.json(e);
  }
});

app.post('/herbs/', async(req, res) => {
  try {
    const data = await client.query(`
    INSERT INTO herbs (herb_name, herb_kingdom, herb_type_species, herb_cool_factor, herb_poisonous)
    VALUES ($1, $2, $3, $4, $5
    RETURNING *`,
    [req.body.herbs_name, req.body.herbs_kingdom, req.body.herbs_type_species, req.body.herbs_cool_factor, req.body.herbs_poisonous]
    );
    res.json(data);
  } catch(e) {
    res.json(e);
  }
});

app.delete('/herbs/:id', async(req, res) => {
  try {
    const data = await client.query(`
      DELETE
      FROM herbs
      SET cool_factor= TRUE
      WHERE id=$1
      RETURNING *`, [req.params.id]);
    res.json(data);
  } catch(e) {
    res.json(e);
  }
});

app.listen(PORT, () => {
  console.log(`Started on ${PORT}`);
});

module.exports = app;
