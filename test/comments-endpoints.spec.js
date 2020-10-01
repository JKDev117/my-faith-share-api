const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');

const {
    testUsers,
    testPosts,
    testComment
} = helpers.makeFixtures();

describe('Comments Endpoints', function() {

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

    describe(`POST /comments`, () => {
        beforeEach('insert posts', () => 
            helpers.seedTables(db, testUsers, testPosts)
        )

        it('creates a comment responding with 201 and the new comment', function() {
            const newComment = {
                user_id: testComment[0].user_id,
                post_id: testComment[0].post_id,
                comment: testComment[0].comment 
            }

            return supertest(app)
                .post('/comments')
                //.set('Authorization', helpers.makeAuthHeader(testUsers[0]))
                .send(newComment)
                .expect(201)
                .expect(res => {
                    expect(res.body).to.have.property('id')
                    expect(res.body.user_id).to.eql(newComment.user_id)
                    expect(res.body.post_id).to.eql(newComment.post_id)
                    expect(res.body.comment).to.eql(newComment.comment)
                })
                .expect(res => 
                    db.from('comments_tb')
                      .select('*')
                      .where({ id: res.body.id })
                      .first()
                      .then(row => {
                        expect(row.user_id).to.eql(newComment.user_id)
                        expect(row.post_id).to.eql(newComment.post_id)
                        expect(row.comment).to.eql(newComment.comment)
                      }) 
                )
        })//end it 'creates a comment responding with 201 and the new comment'    

    })//end describe `POST /comments`

    describe(`DELETE /comments`, () => { 
        context('Given no comments in the database', () => {
            it('responds with 404', () => {
                const testId = 123456;

                return supertest(app)
                    .delete('/comments')
                    //.set('Authorization', helpers.makeAuthHeader(testUsers[0]))
                    .send({ id: testId })
                    .expect(404, {error: {message: 'Comment does not exist!'}});
            });
        });

        context('Given there are comments in the database', () => {
            beforeEach('insert comments', () => 
                helpers.seedTables(db, testUsers, testPosts, testComment)
            )
            it('responds with 204 and removes the post', () => {
                const idToRemove = 1;
                const expectedComments = {};
                return supertest(app)
                    .delete('/comments')
                    .send({id: idToRemove})
                    //.set('Authorization', helpers.makeAuthHeader(testUsers[0]))
                    .expect(204)
                    .then(res => 
                        supertest(app)
                            .get('/comments')
                            //.set('Authorization', helpers.makeAuthHeader(testUsers[0]))
                            .expect(expectedComments)
                    )
            }) //end 'it responds with 204 and removes the comment' 
        }) //end context 'Given there are comments in the database'
        


    })//end describe 'DELETE /comments'

    
})//end describe 'Comments Endpoints'

