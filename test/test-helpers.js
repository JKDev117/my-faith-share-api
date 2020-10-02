const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

function makeUsers(){
    return[
        {
            id: 1,
            first_name: 'Steve',
            last_name: 'Cioccolanti',
            user_name: 'cioccolanti',
            password: 'Password1!',
            date_created: '2020-07-15T16:28:32.615Z',
            date_modified: null,
            profile_image_url: 'https://i.imgur.com/1TFqjAS.jpg',
            bg_image_url: 'https://i.imgur.com/nYN45VB.jpg',
            user_bio: `Hello world, I'm Pastor Steve!`
        },
        {
            id: 2,
            first_name: 'Eitan',
            last_name: 'Bar',
            user_name: 'ebar1',
            password: 'Password1!',
            date_created: '2020-08-10T18:28:32.615Z',
            date_modified: null,
            profile_image_url: 'https://i.imgur.com/hW5QDM5.jpg',
            bg_image_url: null,
            user_bio: null
        },
        {
            id: 3,
            first_name: 'Christine',
            last_name: 'Caine',
            user_name: 'ccaine',
            password: 'Password1!',
            date_created: '2020-08-15T17:28:32.615Z',
            date_modified: null,
            profile_image_url: 'https://i.imgur.com/9vln7v6.jpg',
            bg_image_url: null,
            user_bio: null
        }
    ]
}

function makePosts(){
    return [
        {
            id: 1, 
            message: "If my interpretation of the Bible is correct, there will be a new strain of coronavirus named something like chrysoscoronavirus or Covidaurum. A lot of times the Bible plays on words that become common or clear later. Like chloroquine is a play on chloros + equine = green horse.",
            date_created: '2020-07-15T17:28:32.615Z',
            share_url: null,
            user_id: 1
        },
        {
            id: 2, 
            message: `"You must have a capacity to receive, or even omnipotence can't give." -C.S. Lewis`,
            date_created: '2020-07-28T17:28:32.615Z',
            share_url: null,
            user_id: 1
        },
        {
            id: 3, 
            message: "Check out our facebook page at https://www.facebook.com/oneforIsrael/",
            date_created: '2020-08-28T17:28:32.615Z',
            share_url: null,
            user_id: 2
        },
        {
            id: 4, 
            message: "Sitting with friends watching a stunning SoCal sunset is good for my soul.",
            date_created: '2020-08-30T17:28:32.615Z',
            share_url: 'https://i.imgur.com/VArOc1b.jpg',
            user_id: 3
        },
        {
            id: 5, 
            message: "Quantum Theory is the closest thing to secular minds catching up to the Bible. The duality of light as particle & wave (the God-Man Jesus). Quantum nonlocality (Omnipresence). Action at a distance or instantaneous affect of one particle on another regardless of distance (Prayer).",
            date_created: '2020-08-30T17:58:32.615Z',
            share_url: null,
            user_id: 1
        }
    ]
}

function addComments(){
    return [
        { 
            id: 1,
            user_id: 1,
            post_id: 4,
            comment: 'Beautiful!',
            date_created: '2020-08-30T17:48:32.615Z'
        }
    ]
}

function addLikes(){
    return [
        {
            id: 1,
            user_id: 2,
            post_id: 3
        }
    ]
}

function makeFixtures(){
    const testUsers = makeUsers();
    const preppedUsers = testUsers.map(user => ({
        ...user,
        password: bcrypt.hashSync(user.password, 12)
    }));
    const testPosts = makePosts();
    const testComment = addComments();
    const testLike = addLikes();
    return { testUsers, preppedUsers, testPosts, testComment, testLike };
}

function cleanTables(db){
    return db.transaction(trx => 
        trx.raw(
            `TRUNCATE
                likes_tb,
                comments_tb,
                posts_tb,
                users_tb
                RESTART IDENTITY CASCADE`
        )
    )
}


function seedUsers(db, users){
    return db.into('users_tb').insert(users)
    .then(() => 
        //update the auto sequence to stay in sync
        db.raw(
            `SELECT setval('users_tb_id_seq', ?)`,
            [users[users.length - 1].id],
        )
    )
    .catch(error => console.log(error))
}

function seedTables(db, users, posts, comments=[], likes=[]){
    //use a transaction to group the queries and auto rollback on any failure
    return db.transaction(async trx => {
        try {
            await seedUsers(trx, users);
            await trx.into('posts_tb').insert(posts);
            //update the auto sequence to match the forced id values
            await trx.raw(
                `SELECT setval('posts_tb_id_seq', ?)`,
                [posts[posts.length - 1].id]
            )
            //only insert comments if there are some
            if(comments.length){
                await trx.into('comments_tb').insert(comments);
            }
            //only insert likes if there are some
            if(likes.length){
                await trx.into('likes_tb').insert(likes);
            }
        }
        catch(e){
            console.log("error", e);
        }
    })
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
    const token = jwt.sign(
        { user_id: user.id },
        secret,
        {
            subject: user.user_name,
            expiresIn: process.env.JWT_EXPIRY,
            algorithm: 'HS256',
        }
    );

    return `Bearer ${token}`;
}


module.exports = {
    makeUsers,
    makePosts,
    addComments,
    addLikes,

    makeFixtures,
    cleanTables,
    seedUsers,
    seedTables,
    makeAuthHeader,
};


