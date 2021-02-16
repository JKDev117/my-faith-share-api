const PostsService = {
    getAllPosts(knex){
        //return knex.select('*').from('posts_tb').orderBy('date_created');
        /*return knex.raw(
            `SELECT
                u.first_name,
                u.profile_image_url,
                p.message,
                p.date_created,
                p.share_url
            FROM users_tb u
            JOIN posts_tb p
            ON p.user_id = u.id`).orderBy('date_created');*/
        return knex('users_tb')
            .join('posts_tb', 'users_tb.id', 'posts_tb.user_id')
            //.select('*')
            .select('users_tb.first_name', 'users_tb.profile_image_url', 'posts_tb.message', 'posts_tb.date_created', 'posts_tb.share_url')
            .orderBy('date_created');
        },
    addNewPost(knex, newPost){
        return knex
            .insert(newPost)
            .into('posts_tb')
            .returning('*')
            .then(rows => {
                return rows[0]
            });
    },
    deletePost(knex, id){
        return knex('posts_tb')
            .where({id: id})
            .delete()
    },
    getById(knex, id){
        return knex
            .from('posts_tb')
            .select('*')
            .where({id: id})
            .first()
    },



}


module.exports = PostsService;