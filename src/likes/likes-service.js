const LikesService = {
    addLike(db, newLike){
        return db
            .insert(newLike)
            .into('likes_tb')
            .returning('*')
            .then(rows => {
                return rows[0]
            });
    },
    getLikes(db){
        return db
            .select('*')
            .from('likes_tb')
    }
    

}


module.exports = LikesService;