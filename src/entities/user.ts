import { Group } from "./group"

export class User{
    constructor(
        public name: string,
        public email: string,
        public id?: number,
        public lastLogin?: Date,
        public password ='',
        public active = true,
        public groups: Group[] = []
    ){}

    public static clone(user: User): User{
        return new User(user.name, user.email, user.id, user.lastLogin, user.password, user.active, user.groups.map(g => Group.clone(g)))
    }

    public toStr(){
        return this.name+' '+this.email
    }
}