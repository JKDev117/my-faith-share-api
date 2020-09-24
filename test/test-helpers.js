//const jwt = require('jsonwebtoken);

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

function addComments(){}

function addLikes(){}

function makeFixtures(){}

function cleanTables(db){}

function seedUsers(){}

function seedPosts(){}

function seedComments(){}

function seedLikes(){}



module.exports = {} 