
module.exports = class User{
    constructor(userId, userName, email, password) {
        this.userId = userId;
        this.userName = userName;
        this.email = email;
        this.password = password;
    }

    getJSON(){
        let user = {
            "userId": this.userId,
            "userName": this.userName,
            "email": this.email
        };
      return user;
    }
}

