import NewUserDTO from "DTO/NewUserDTO";
import fs from 'fs/promises';
import User from "models/userModel";

class UserService {
    public static async createNewUser(newUser:NewUserDTO):Promise<void>{
        //create a new User() obg
        const {password, username, email, birthday, avatarUrl} = newUser;
        const user:User = new User(username, password, email, birthday, avatarUrl); 

        //add it to the user file
            //get user[]

            //push

            //save the user back to the users file
    }
};



//dto 