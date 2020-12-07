const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');;
const {info, debug, warning, error} = require("../winston");
const fileLabel = "userController"
const userSQL = require("../database/UserSQL");

module.exports = class LoginController{
    constructor(){
        this.login.bind(this);
    }
    
    async login(req, res){
        const email = req.body.email;
        const password = req.body.password;
        try {
            const result = await userSQL.login(email, password);
            if (result.success) {
                debug(fileLabel, "Successful Authentication " + email);
                debug(JSON.stringify(result))
                return res.status(200).json({"success": true, "data": result}); // ログイン成功
            } else {
                info(fileLabel, "Unsuccessful Authentication " + email + ": " + JSON.stringify(result));
                return { message: '認証情報と一致するレコードがありません。' };
            }
        } catch (exception) {
            error(fileLabel, "Error in attempt to login " + email + ": " + exception);
            return { message: '認証情報と一致するレコードがありません。' };
        }
    }
}
