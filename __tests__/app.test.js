require('dotenv').config();

const fakeRequest = require('supertest');
const app = require('../server.js');

describe('app routes', () => {
  beforeAll(() => {
    // TODO: a
  });

  beforeEach(() => {
    // TODO: ADD DROP SETUP DB SCRIPT
  });

  afterAll(() => {
    // TODO: ADD CLOSE DB SCRIPT
  });

  test('returns herbs', async() => {

    const expectation = [
      {
        name: 'Lavender',
        kingdom: 'Plantae',
        type_species: 'Lavandula spica',
        cool_factor: 7,
        poisonous: false,
      },
      {
        name: 'Rosemary',
        kingdom: 'Plantae',
        type_species: 'Salvia rosmarinus',
        cool_factor: 7,
        poisonous: false,
      },
      {
        name: 'Basil',
        kingdom: 'Plantae',
        type_species: 'Ocimum basilicum',
        cool_factor: 6,
        poisonous: false,
      },
      {
        name: 'Belladonna or Deadly Nightshade',
        kingdom: 'Plantae',
        type_species: 'Atropa belladonna',
        cool_factor: 10,
        poisonous: true,
      }
    ];

    const data = await fakeRequest(app)
      .get('/herbs')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(data.body).toEqual(expectation);
  });
});
