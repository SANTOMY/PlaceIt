
module.exports = class User{
    constructor(userId, userName, email, password, university, isActive) {
        this.userId = userId;
        this.userName = userName;
        this.email = email;
        this.password = password;
        this.university = university
        this.isActive = isActive;
    }

    getJSON(){
        let user = {
            "userId": this.userId,
            "userName": this.userName,
            "email": this.email,
            "university": this.university,
            "is_active":this.isActive
        };
        return user;
    }
}

