const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe(`Protected endpoints`, () => {
    
    let db;

    const {
        preppedUsers,
        testPosts,
    } = helpers.makeFixtures();

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL,
        });
        app.set('db', db);
    });

    after('disconnect from db', () => db.destroy());

    before('cleanup', () => helpers.cleanTables(db));

    afterEach('cleanup', () => helpers.cleanTables(db));

    beforeEach('insert posts', () =>
      helpers.seedTables(db, preppedUsers, testPosts)
    );

    const protectedEndpoints = [
        {
          name: 'POST /auth/refresh',
          path: '/auth/refresh',
          method: supertest(app).post,
        },
        {
          name: 'POST /comments',
          path: '/comments',
          method: supertest(app).post,
        },
        {
          name: 'DELETE /comments',
          path: '/comments',
          method: supertest(app).delete,  
        },
        {
          name: 'POST /likes',
          path: '/likes',
          method: supertest(app).post,
        },
        {
          name: 'GET /likes',
          path: '/likes',
          method: supertest(app).get,
        },
        {
          name: 'GET /posts',
          path: '/posts',
          method: supertest(app).get,
        },
        {
          name: 'POST /posts',
          path: '/posts',
          method: supertest(app).post,  
        },
        {
          name: 'DELETE /posts',
          path: '/posts',
          method: supertest(app).delete,  
        },
        {
          name: 'GET /users/:user_id',
          path: '/users/:user_id',
          method: supertest(app).get,  
        },
        {
          name: 'PATCH /users/:user_id',
          path: '/users/:user_id',
          method: supertest(app).patch,  
        }
    ];
  
    protectedEndpoints.forEach(endpoint => {
      describe(endpoint.name, () => {
          it(`responds with 401 'Missing basic token' when no basic token`, () => {
            return endpoint.method(endpoint.path)
              .expect(401, { error: `Missing bearer token` });
          });
          it(`responds 401 'Unauthorized request' when invalid JWT secret`, () => {
                const validUser = preppedUsers[0];
                const invalidSecret = 'bad-secret';
                return endpoint.method(endpoint.path)
                  .set('Authorization', helpers.makeAuthHeader(validUser, invalidSecret))
                  .expect(401, { error: `Unauthorized request` });
          });
          it(`responds 401 'Unauthorized request' when invalid sub in payload`, () => {
                 const invalidUser = { user_name: 'user-not-existy', id: 1 };
                 return endpoint.method(endpoint.path)
                   .set('Authorization', helpers.makeAuthHeader(invalidUser))
                   .expect(401, { error: `Unauthorized request` });
          }) ;
      });
    });

});//end describe 'Protected endpoints'