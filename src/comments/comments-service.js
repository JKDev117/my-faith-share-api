const CommentsService = {
    getById(db, id){
        return db
            .select('*')
            .from('comments_tb')
            .where(
                { id: id }
            )
            .first()
    },
    insertComment(db, newComment) {
        return db
            .insert(newComment)
            .into('comments_tb')
            .returning('*')
            //.then(([comment]) => comment)            
    },
    removeComment(db, id){
        return db
            .select('*')
            .from('comments_tb')
            .where(
                { id: id }
            )
            .delete();
    },
}


module.exports = CommentsService;