import { getFileData, saveFileData } from "../DAL/fileDataLayer";
import NewUserDTO from "../DTO/NewUserDTO";
import User from "../models/userModel";

export default class UserService {
  public static async createNewUser(newUser: NewUserDTO): Promise<boolean> {
    //create a new User() obg
    const { password, username, email, birthday, avatarUrl } = newUser;
    const user: User = new User(username, password, email, birthday, avatarUrl);

    //get all users list
    let users: User[] = (await getFileData<User>("users")) as User[];
    if(!users)  users = [];

    //push
    users.push(user);

    //save the user back to the users file
    const ifSaved: boolean = await saveFileData<User>("users", users);
    return ifSaved;
  }
}

//dto
