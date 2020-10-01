const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');

const {
    testUsers,
    testPosts,
    testLike
} = helpers.makeFixtures();

describe('Likes Endpoints', function() {

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

    describe('POST /likes', () => {
        beforeEach('insert posts', () => 
            helpers.seedTables(db, testUsers, testPosts)
        )

        it('creates a "like" responding with 201', function() {
            const newLike = {
                user_id: testLike[0].user_id,
                post_id: testLike[0].post_id
            }

            return supertest(app)
                .post('/likes')
                //.set('Authorization', helpers.makeAuthHeader(testUsers[0]))
                .send(newLike)
                .expect(201)
                .expect(res => {
                    expect(res.body).to.have.property('id')
                    expect(res.body.user_id).to.eql(newLike.user_id)
                    expect(res.body.post_id).to.eql(newLike.post_id)
                })
                .expect(res => 
                    db.from('likes_tb')
                      .select('*')
                      .where({ id: res.body.id })
                      .first()
                      .then(row => {
                        expect(row.user_id).to.eql(newLike.user_id)
                        expect(row.post_id).to.eql(newLike.post_id)
                      }) 
                )
        })//end it 'creates a comment responding with 201 and the new comment' 
    }) //end describe 'POST /likes'

    describe('GET /likes', () => { 
        context('Given no "likes" in database', () => {

            it('responds with 200 and an empty list', () => {
                return supertest(app)
                    .get('/likes')
                    //.set('Authorization', helpers.makeAuthHeaders(testUsers[0]))
                    .expect(200, [])
            })
        })//End context 'Given no likes'

        context('Given there are "likes" in the database', () => {

            beforeEach('insert likes', () => 
                helpers.seedTables(db, testUsers, testPosts, [], testLike)
            );

            it('GET /likes responds with 200 and all of the like items', () => {
                return supertest(app)
                    .get('/likes')
                    //.set('Authorization', helpers.makeAuthHeaders(testUsers[0]))
                    .expect(200, testLike);
            });
        }); //end context 'Given there are post items in the database'
    })//end describe 'GET /likes'



}) //end describe 'Likes  Endpoints'