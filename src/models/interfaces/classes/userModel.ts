import { v4 } from "uuid"


class User {
    public id:string
    public folowers:string[] = [];
    public folowing:string[] = [];
    public isLockedAccount:boolean = false;
    constructor(
        public username:string,
        public password:string,
        public email:string,
        public birthday:string,
    ) {
        this.id = v4();
    }
}
