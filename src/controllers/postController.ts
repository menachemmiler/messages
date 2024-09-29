import exp, { json, Request, Response, Router } from "express";
import PostService from "../services/postService";
import NewPostDTO from "../DTO/NewPostDTO";
import Post from "../models/postModel";
import ResponseMessage from "../DTO/ResponseMessage";

const router: Router = exp.Router();

router.get(
  "/",
  async (req: Request, res: Response<ResponseMessage>): Promise<void> => {
    try {
      const allPosts: Post[] = (await PostService.getAllPosts()) as Post[];
      if (allPosts) {
        res.status(200).json({
          err: false,
          message: allPosts,
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
    const resoulte = await getPostByContent(search);
    res.status(200).json({
      ...resoulte,
    });
  } catch (err: any) {
    res.status(404).json({
      err: true,
      message: "defoulte eror",
    });
  }
});

const getPostByContent = async (search: string): Promise<ResponseMessage> => {
  try {
    const allPosts: Post[] = (await PostService.getAllPosts()) as Post[];
    const allIncluedsContent = allPosts.filter((a) => {
      return a.contect.includes(search);
    });
    if (allIncluedsContent.length) {
      return {
        err: false,
        message: allIncluedsContent,
      };
    } else {
      return {
        err: false,
        message: "אין פוסטים עם החיפוש הזה",
      };
    }
  } catch (err: any) {
    return {
      err: true,
      message: "erorr search",
    };
  }
};

const getPostById = async (id: string): Promise<ResponseMessage> => {
  try {
    const allPosts: Post[] = (await PostService.getAllPosts()) as Post[];
    const withSameId = allPosts.filter((a) => {
      return a.id == id;
    });
    if (withSameId.length) {
      return {
        err: false,
        message: withSameId,
      };
    } else {
      return {
        err: false,
        message: "אין פוסטים עם המזהה הזה",
      };
    }
  } catch (err: any) {
    return {
      err: true,
      message: "שגיאת חיפוש לפי מזהה",
    };
  }
};

router.patch(
  "/like",
  async (req: Request, res: Response<ResponseMessage>): Promise<void> => {
    try {
      const resoulte = await PostService.LikePost(req.body);
      if (!resoulte) {
        res.status(404).json({
          err: true,
          message: "defoulte eror",
        });
      }
      res.status(200).json({
        err: false,
        message: "הליק התווסף בהצלחה"
      });
    } catch (err: any) {
      res.status(404).json({
        err: true,
        message: "like eror",
      });
    }
  }
);

router.get(
  "/:id",
  async (req: Request, res: Response<ResponseMessage>): Promise<void> => {
    try {
      console.log(req.params.id);
      const resoulte = await getPostById(req.params.id);
      if (resoulte.err) {
        res.status(404).json(resoulte);
      } else {
        res.status(200).json(resoulte);
      }
    } catch (err: any) {
      res.status(404).json({
        err: true,
        message: `שגיאה בקבלת פוסט לפי מזהה${err}`,
      });
    }
  }
);

export default router;
