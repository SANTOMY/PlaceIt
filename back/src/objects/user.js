
module.exports = class User{
    constructor(userId, userName, email, password, university) {
        this.userId = userId;
        this.userName = userName;
        this.email = email;
        this.password = password;
        this.university = university
    }

    getJSON(){
        let user = {
            "userId": this.userId,
            "userName": this.userName,
            "email": this.email,
            "university": this.university
        };
        return user;
    }
}

