const PostsService = {

    getAllPosts(knex){
        //return knex.select('*').from('posts_tb').orderBy('date_created');
        
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