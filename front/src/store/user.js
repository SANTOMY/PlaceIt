module.exports = class User{
    constructor(userId, userName, email, password, university, is_active) {
        this.userId = userId;
        this.userName = userName;
        this.email = email;
        this.password = password;
        this.university = university;
        this.is_active = is_active
    }

    getJSON(){
        let user = {
            "userId": this.userId,
            "userName": this.userName,
            "email": this.email,
            "university": this.university,
            "is_active": this.is_active
        };
      return user;
    }
}

