import NewPostDTO from "../DTO/NewPostDTO";
import { getFileData, saveFileData } from "../DAL/fileDataLayer";
import Post from "../models/postModel";

export default class PostService {
  public static async getAllPosts(): Promise<Post[] | void> {
    const allPostsInData = (await getFileData<Post>("posts")) as Post[];
    return allPostsInData;
  }

  public static async createNewPost(newPost: NewPostDTO): Promise<boolean> {
    //create a new Post() obg
    const { authorId, contect, hashTags, ref } = newPost;
    let post: Post;
    if (ref) {
      post = new Post(authorId, contect, hashTags, ref);
    } else {
      post = new Post(authorId, contect, hashTags);
    }

    //add it to the post.json file
    //get post[]
    let posts: Post[] | void = (await getFileData<Post>("posts")) as Post[];
    if (!posts) posts = [];

    //push
    posts.push(post);

    //save the user back to the post.json file
    const ifSaved: boolean = await saveFileData<Post>("posts", posts);
    return ifSaved;
  }
}
