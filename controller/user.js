const logger = require('../lib/logger')(__filename);
const UserDB = require('../db/user_db') 

class UserController{
    getUsers = async (req, res, next) => {
        try{
            let users = await UserDB.getUsers(req.body)
            res.status(200).json({
                status: 1,
                users:users
            })
        }catch(e){
            logger.error(e.message)
            res.status(200).json({
                status: 0
            })
        }
    }
    
}

module.exports = new UserController()
