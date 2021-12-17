const logger = require('../lib/logger')(__filename);

class UserDB{
    
    getUsers = async(data) => {
        var query = {age:{$lte:30}}
        const {client, db} = await require("./mongo_conn");
        const cursor = db.collection('users').find(query)
        var users = []
        while(await cursor.hasNext()) {
            const doc = await cursor.next();
            await users.push(doc)
        }
        return users
    }
}

module.exports = new UserDB()