import NewPostDTO from "../DTO/NewPostDTO";
import { getFileData, saveFileData } from "../DAL/fileDataLayer";
import Post from "../models/postModel";
import LikePostDTO from "../DTO/LikePostDTO";

export default class PostService {
  public static async getAllPosts(): Promise<Post[]> {
    let posts: Post[] | void = (await getFileData<Post>("posts")) as Post[];
    if (!posts) posts = [] as Post[];
    return posts;
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
    const posts: Post[] = await this.getAllPosts();

    //push
    posts.push(post);

    //save the user back to the post.json file
    const ifSaved: boolean = await saveFileData<Post>("posts", posts);
    return ifSaved;
  }

  public static async LikePost(LikePost: LikePostDTO): Promise<boolean> {
    try {
      const { userId, postId } = LikePost;
      //to get all posts
      const allPosts: Post[] = await this.getAllPosts();
      //to search in the posts a post with same postId and to like it
      const newPosts: Post[] = allPosts.map((post: Post) => {
        if (post.id == postId) {
          return {
            id: post.id,
            authorId: post.authorId,
            contect: post.contect,
            hashTags: post.hashTags,
            likeBy: [...post.likeBy, userId],
            ref: post.ref,
            createdAt: post.createdAt,
          };
        } else {
          return post;
        }
      });
      const ifSaved: boolean = await saveFileData<Post>("posts", newPosts);
      return ifSaved;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
