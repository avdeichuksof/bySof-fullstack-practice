class UserDTO {

    constructor(user){
        this.fullName = user.firstName + ' ' + user.lastName,
        this.email = user.email,
        this.age = user.age,
        this.cart = user.cart,
        this.role = user.role
    }

}

export default UserDTO