class UserDTO {

    constructor(user){
        this.id = user._id 
        this.firstName = user.firstName
        this.lastName = user.lastName
        this.fullName = user.firstName + ' ' + user.lastName;
        this.email = user.email;
        this.age = user.age;
        this.cart = user.cart;
        this.role = user.role;
        this.lastConnection = user.lastConnection;
    }

}

export default UserDTO