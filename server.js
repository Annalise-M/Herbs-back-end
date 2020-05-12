require('dotenv').config();

const client = require('./lib/client');

// Initiate database connection
client.connect();

const app = require('./lib/app');

const PORT = process.env.PORT || 3000;

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
app.post();

app.listen(PORT, () => {
  console.log(`Started on ${PORT}`);
});

module.exports = app;
