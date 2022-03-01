
export class User{
    constructor(
        public name: string,
        public email: string,
        public id?: number,
        public lastLogin?: Date,
        public password =''
    ){}

    public static clone(user: User): User{
        return new User(user.name, user.email, user.id, user.lastLogin, user.password)
    }

    public toStr(){
        return this.name+' '+this.email
    }
}