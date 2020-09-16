const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');
const { expect } = require('chai');

const {
    testUsers,
    testPosts
} = helpers.makeFixtures();


describe('Posts Endpoints', function(){

    let db;

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL
        })
        app.set('db', db);
    });

    after('disconnect from db', () => db.destroy());

    before('clean up', () => helpers.cleanTables(db));

    afterEach('cleanup', () => helpers.cleanTables(db));








})