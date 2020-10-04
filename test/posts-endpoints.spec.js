const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');


const {
    testUsers,
    testPosts
} = helpers.makeFixtures();

const testUser = testUsers[0];

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

    //describe 'GET /posts'
    describe('GET /posts', () => {
        context('Given no posts', () => {

            beforeEach(() => helpers.seedUsers(db, testUsers));

            it('responds with 200 and an empty list', () => {
                return supertest(app)
                    .get('/posts')
                    .set('Authorization', helpers.makeAuthHeader(testUser))
                    .expect(200, [])
            })
        })//End context 'Given no posts'

        context('Given there are post items in the database', () => {

            beforeEach('insert post items', () => 
                helpers.seedTables(db, testUsers, testPosts)
            );

            it('GET /posts responds with 200 and all of the post items', () => {
                return supertest(app)
                    .get('/posts')
                    .set('Authorization', helpers.makeAuthHeader(testUser))
                    .expect(200, testPosts);
            });
        }); //end context 'Given there are post items in the database'
    }) //end describe GET /posts

    //describe 'POST /posts'
    describe('POST /posts', () => {

        beforeEach(() => helpers.seedUsers(db, testUsers));

        it('creates a post item, responding with 201 and the new post item', function() {
            const testUser = testUsers[0];
            const newPost = {
                message: "Good morning, everyone! Thank God it's Friday!",
                user_id: testUser.id
            }
            return supertest(app)
                .post('/posts')
                .set('Authorization', helpers.makeAuthHeader(testUser))
                .send(newPost)
                .expect(201)
                .expect(res => {
                    expect(res.body).to.have.property('id')
                    expect(res.body.message).to.eql(newPost.message)
                    expect(res.body.user_id).to.eql(testUser.id)
                })
                .then(postRes => {
                    db
                        .from('posts_tb')
                        .select('*')
                        .where({id: postRes.body.id})
                        .first()
                        .then(row => {
                            expect(row.message).to.eql(newPost.message)
                            expect(row.user_id).to.eql(testUser.id)
                        })
                })
        })//end 'it creates a post item, responding with 201 and the new post item'
    })//end describe 'POST /posts'


    describe('DELETE /posts', () => {
        context('Given no posts', () => {
            beforeEach(() => helpers.seedUsers(db, testUsers));
            it('responds with 404', () => {
                const postId = 123456;
                return supertest(app)
                    .delete('/posts')
                    .send({id: postId})
                    .set('Authorization', helpers.makeAuthHeader(testUser))
                    .expect(404, {error: {message: 'Post does not exist.'}})
            })
        })
    
        context('Given there are posts in the database', () => {
            beforeEach('insert posts', () => 
                helpers.seedTables(db, testUsers, testPosts)
            );
        
            it('responds with 204 and removes the post', () => {
                const idToRemove = 1;
                const expectedPosts = testPosts.filter(post => post.id !== idToRemove);
                return supertest(app)
                    .delete('/posts')
                    .send({id: idToRemove})
                    .set('Authorization', helpers.makeAuthHeader(testUser))
                    .expect(204)
                    .then(res => 
                        supertest(app)
                            .get('/posts')
                            .set('Authorization', helpers.makeAuthHeader(testUser))
                            .expect(expectedPosts)
                    )
            }) //end 'it responds with 204 and removes the post' 
        })//end context 'Given there are posts in the database'
    })//end describe 'DELETE /posts'

}) //end describe Posts Endpoints


    
