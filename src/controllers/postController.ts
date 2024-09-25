import exp, { json, Request, Response, Router } from "express";
import PostService from "../services/postService";
import NewPostDTO from "../DTO/NewPostDTO";
import Post from "../models/postModel";

const router: Router = exp.Router();

router.get(
  "/",
  async (
    req: Request,
    res: Response<{ allPosts: Post[] } | any>
  ): Promise<void> => {
    try {
      const allPosts: Post[] = (await PostService.getAllPosts()) as Post[];
      if (allPosts) {
        res.status(200).json({
          allPosts,
        });
      } else {
        res.status(404).json({
          err: true,
          message: "לא הצליח לקבל את הפוסטים",
        });
      }
    } catch (err: any) {
      res.status(404).json({
        err: true,
        message: "defoulte eror",
      });
    }
  }
);

router.post(
  "/",
  async (req: Request<any, any, NewPostDTO>, res: Response): Promise<void> => {
    try {
      const resoulte: boolean = await PostService.createNewPost(req.body);
      if (resoulte) {
        res.status(200).json({
          err: false,
          message: "ההודעה נוצרה בהצלחה",
          data: undefined,
        });
      } else {
        res.json({
          message: "בעיה ביצירת ההודעה postController.ts row 42",
        });
      }
    } catch (err: any) {
      res.status(404).json({
        err: true,
        message: "defoulte eror",
      });
    }
  }
);

//search quary ?content=...
//http://localhost:1234/post/search?content=edcve
router.get("/search", async (req: Request, res: Response): Promise<void> => {
  try {
    const search: any = req.query.content;
    // if(!search) res.status(400).json
    const resoulte = await getPostByContent(search);
    res.status(200).json({
      ...resoulte
    });
  } catch (err: any) {
    res.status(404).json({
      err: true,
      message: "defoulte eror",
    });
  }
});

const getPostByContent = async (search: string): Promise<any> => {
  
  try {
    const allPosts: Post[] = (await PostService.getAllPosts()) as Post[];
    const allIncluedsContent = allPosts.filter((a) => {
      return a.contect.includes(search);
    });
    if (allIncluedsContent.length) {
      return {
        arr: false,
        message: allIncluedsContent,
      };
    } else {
      return {
        arr: false,
        message: "אין פוסטים עם החיפוש הזה",
      };
    }
  } catch (err: any) {
    return {
      arr: true,
      message: "erorr search",
    };
  }
};

con

router.get("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(200).json({
      err: false,
      message: "5.2: post/:id (קבלת הודעה לפי מזהה של ההודעה)",
      data: undefined,
    });
  } catch (err: any) {
    res.status(404).json({
      err: true,
      message: "defoulte eror",
    });
  }
});

router.patch(
  "/like/:id",
  async (req: Request, res: Response): Promise<void> => {
    try {
      res.status(200).json({
        err: false,
        message: "like to post",
        data: undefined,
      });
    } catch (err: any) {
      res.status(404).json({
        err: true,
        message: "defoulte eror",
      });
    }
  }
);

export default router;
