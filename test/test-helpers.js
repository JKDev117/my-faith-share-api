//const jwt = require('jsonwebtoken);

function makeUsers(){
    return[
        {
            id: 1,
            first_name: 'Steve',
            last_name: 'Cioccolanti',
            user_name: 'cioccolanti',
            password: 'Password1!',
            date_created: '2029-01-22T16:28:32.615Z',
            date_modified: null,
            profile_image_url: 'https://i.imgur.com/1TFqjAS.jpg',
            bg_image_url: 'https://i.imgur.com/nYN45VB.jpg',
            user_bio: `Hello world, I'm Pastor Steve!`
        },
        {
            id: 2,
            first_name: 'Christine',
            last_name: 'Caine',
            user_name: 'ccaine',
            password: 'Password1!',
            date_created: '2029-01-22T17:28:32.615Z',
            date_modified: null,
            profile_image_url: 'https://i.imgur.com/9vln7v6.jpg',
            bg_image_url: null,
            user_bio: null
        },
        {
            id: 3,
            first_name: 'Eitan',
            last_name: 'Bar',
            user_name: 'ebar1',
            password: 'Password1!',
            date_created: '2029-01-22T18:28:32.615Z',
            date_modified: null,
            profile_image_url: 'https://i.imgur.com/hW5QDM5.jpg',
            bg_image_url: null,
            user_bio: null
        }
    ]
}

function createPosts(){}

function addComments(){}


function addLikes(){}

function makeFixtures(){}

function cleanTables(db){}

function seedUsers(){}

function seedPosts(){}

function seedComments(){}

function seedLikes(){}



module.exports = {} 