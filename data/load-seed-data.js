const client = require('../lib/client');
// import our seed data:
const herbs = require('./herbs.js');
const usersData = require('./users.js');

run();

async function run() {

  try {
    await client.connect();

    const users = await Promise.all(
      usersData.map(user => {
        return client.query(`
                      INSERT INTO users (email, hash)
                      VALUES ($1, $2)
                      RETURNING *;
                  `,
        [user.email, user.hash]);
      })
    );
      
    const user = users[0].rows[0];

    await Promise.all(
      herbs.map(herb => {
        return client.query(`
                    INSERT INTO herbs (name, cool_factor, owner_id)
                    VALUES ($1, $2, $3);
                `,
        [herb.name, herb.kingdom, herb.type_species, herb.cool_factor, herb.poisonous, user.id]);
      })
    );
    

    console.log('seed data load complete');
  }
  catch(err) {
    console.log(err);
  }
  finally {
    client.end();
  }
    
}
